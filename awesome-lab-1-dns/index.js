'use strict';

const net = require('net');
const logger = require('intel');
const fs = require('fs');
const args = require('yargs').argv;

logger.addHandler(new logger.handlers.File('dns-server.log'));
logger.addHandler(new logger.handlers.Console());
const resourceFilePath = args.file;

const HEADER_LENGTH = 16;

const TYPES =['A','CNAME', 'NS'];


let server = net.createServer();
let cash = [];
let connection = {};
let currentRequest = {};
let localRecords = [];

localRecords = readLocalRecords();

server.on('connection', handleConnection);
server.listen(9000, () => logger.info('server is listening to ' + server.address()));
logger.info('server is listening');


function readLocalRecords() {
    let content = fs.readFileSync(resourceFilePath, "utf-8");
    console.log(content);
    let lines = content.split("\n");
    return lines.map(line => strToRecord(line));
}

function handleConnection(conn) {
    connection = conn;
    let remoteAddress = connection.remoteAddress + ":" + connection.remotePort;
    connection.on('data', processRequest);
    connection.once('close', () => logger.info('connection is closed'));
    connection.on('error', (error) => logger.error(`connection error ${error}`))
}

function refreshCash() {
    cash = cash.filter(rec => rec.ttl < (new Date().getSeconds() - rec.startTime.getSeconds()))
}

function findInCash(request) {
    let dnsRequest = parseRequest(request);
    let record = cash.find(rec => rec.name === dnsRequest.name
        && rec.type === dnsRequest.type
        && rec.ttl < (new Date().getSeconds() - rec.startTime.getSeconds()));
    refreshCash();
    return record;
}

function buildResponse(response) {
    return "";
}

function processRequest(request) {
    console.log(request);
    const dnsRequest = parseDnsMessageBytes(request);
    const question  = dnsRequest.questions[0];

    let response = findRecordInMemory(request);
    if (response) return buildResponse(response);
    response = findInCash(request);
    if (response) return response;
    response = askGoogleDNS(request);
    return buildResponse(response);
}


function askGoogleDNS(request) {
    return undefined;
}

function findRecordInMemory(request) {
    let dnsRecord = parseRequest(request);
    return localRecords.find(rec => dnsRecord.name === rec.name);
}

function parseRequest(request) {

    let body = request.slice(HEADER_LENGTH);
    let dnsRequest = {};
    let binQName = body.split("00")[0];
    let binQType = body.split("00")[1];
    let binQClass = body.split("00")[2];
    let nameLabels = binQName.split("0");
    let url = nameLabels.map(binLabel =>{
        binLabel.slice(1);
        let charCodes = binLabel
        }).join(".");

}

function strToRecord(recordStr, isLocal = false) {
    let parts = recordStr.trim().split(" ");
    if (parts.length < 4) {
        throw new Error("Record is to short");
    }
    let dnsRecord = {};
    dnsRecord.name = parts[0];
    dnsRecord.type = parts[1];
    dnsRecord.ttl = parts[2];
    dnsRecord.record = parts[3];
    dnsRecord.local = isLocal;
    dnsRecord.startTime = new Date();
    return dnsRecord;
}

function parseDnsMessageBytes (buf) {
    const msgFields = {};

    // (c) RFC 1035 p. 4.1.1. Header section format
    msgFields['ID'] = buf.readUInt16BE(0);

    const byte_2 = buf.readUInt8(2);                // byte #2 (starting from 0)
    const mask_QR = 0b10000000;
    msgFields['QR'] = !!(byte_2 & mask_QR);         // 0 "false" => query, 1 "true" => response

    const mask_Opcode = 0b01111000;
    const opcode = (byte_2 & mask_Opcode) >>> 3;    // meaningful values (dec): 0, 1, 2, others reserved
    msgFields['Opcode'] = opcode;

    const mask_AA = 0b00000100;
    msgFields['AA'] = !!(byte_2 & mask_AA);

    const mask_TC = 0b00000010;
    msgFields['TC'] = !!(byte_2 & mask_TC);

    const mask_RD = 0b00000001;
    msgFields['RD'] = !!(byte_2 & mask_RD);


    const byte_3 = buf.readUInt8(3);                // byte #3
    const mask_RA = 0b10000000;
    msgFields['RA'] = !!(byte_3 & mask_RA);

    const mask_Z = 0b01110000;
    msgFields['Z'] = (byte_3 & mask_Z) >>> 4;       // always 0, reserved

    const mask_RCODE = 0b00001111;
    msgFields['RCODE'] = (byte_3 & mask_RCODE);     // 0 => no error; (dec) 1, 2, 3, 4, 5 - errors, see RFC

    msgFields['QDCOUNT'] = buf.readUInt16BE(4);     // number of entries in question

    msgFields['ANCOUNT'] = buf.readUInt16BE(6);     // number of entries in answer

    msgFields['NSCOUNT'] = buf.readUInt16BE(8);

    msgFields['ARCOUNT'] = buf.readUInt16BE(10);

    let currentByteIndex = 12;  // as Question section starts wrom byte #12 of DNS message
    // (c) RFC 1035 p. 4.1.2. Question section format
    msgFields['questions'] = [];
    for (let qdcount = 0; qdcount < msgFields['QDCOUNT']; qdcount++) {
        const question = {};

        const resultByteIndexObj = { endOffset: undefined };
        const domain = readDomainName(buf, currentByteIndex, resultByteIndexObj);

        currentByteIndex = resultByteIndexObj.endOffset + 1;

        question['domainName'] = domain;

        question['qtype'] = buf.readUInt16BE(currentByteIndex);     // 1 => "A" record
        currentByteIndex += 2;

        question['qclass'] = buf.readUInt16BE(currentByteIndex);    // 1 => "IN", i.e. Internet
        currentByteIndex += 2;

        msgFields['questions'].push(question);
    }

    // (c) RFC 1035 p. 4.1.3. Resource record format
    // Applicable for answer, authority, and additional sections
    ['answer', 'authority', 'additional'].forEach(function(section, i, arr) {
        // ['answer'].forEach(function(section, i, arr) {
        let msgFieldsName, countFieldName;

        // ToDo make these as constants
        switch(section) {
            case 'answer':
                msgFieldsName = 'answers';
                countFieldName = 'ANCOUNT';
                break;
            case 'authority':
                msgFieldsName = 'authorities';
                countFieldName = 'NSCOUNT';
                break;
            case 'additional':
                msgFieldsName = 'additionals';
                countFieldName = 'ARCOUNT';
                break;
        }

        msgFields[msgFieldsName] = [];
        for (let recordsCount = 0; recordsCount < msgFields[countFieldName]; recordsCount++) {
            let record = {};

            const objReturnValue = {};
            const domain = readDomainName(buf, currentByteIndex, objReturnValue);
            currentByteIndex = objReturnValue['endOffset'] + 1;

            record['domainName'] = domain;
            // unlike 'question' section fields, these for answer, authority and additional sections
            // does not have leading 'q' in field name, i.e.: qtype => type, qclass => class, etc.,
            // and have some additional fields comparing to 'question'
            record['type'] = buf.readUInt16BE(currentByteIndex);     // 1 corresponds "A" record, see specs
            currentByteIndex += 2;

            record['class'] = buf.readUInt16BE(currentByteIndex);    // 1 => "IN", i.e. Internet
            currentByteIndex += 2;

            // ttl takes 4 bytes
            record['ttl'] = buf.readUIntBE(currentByteIndex, 4);
            currentByteIndex += 4;

            record['rdlength'] = buf.readUInt16BE(currentByteIndex);
            currentByteIndex += 2;

            // const rdataBinTempBuf = buf.slice(currentByteIndex, currentByteIndex + record['rdlength']);    // creates new buffer SHARING memory with buf
            // record['rdata_bin'] = Buffer.from(rdataBinTempBuf);     // creates new buffer with COPYING data from rdataBinTempBuf

            const rdataBinTempBuf = buf.slice(currentByteIndex, currentByteIndex + record['rdlength']);
            record['rdata_bin'] = Buffer.alloc(record['rdlength'], rdataBinTempBuf);

            if (record['type'] === 1 && record['class'] === 1) {
                // if rdata contains IPv4 address,
                // read IP bytes to string IP representation
                let ipStr = '';
                for (let ipv4ByteIndex = 0; ipv4ByteIndex < 4; ipv4ByteIndex++) {
                    ipStr += '.' + buf.readUInt8(currentByteIndex).toString();
                    currentByteIndex++;
                }
                record['IPv4'] = ipStr.substring(1);  // rid of first '.'

            } else {    // just treat drata as raw bin data, do not parse
                currentByteIndex += record['rdlength'];
            }

            msgFields[msgFieldsName].push(record);
        }
    });

    return msgFields;
}

function composeDnsMessageBin(messageFields) {
    const buf = new Buffer.alloc(512);      // UDP message max size is 512 bytes (с) RFC 1035 2.3.4. Size limits
    let currentByteIndex = 0;        // index of byte in buffer, which is currently written

    buf.writeUInt16BE(messageFields.ID, currentByteIndex);
    currentByteIndex += 2;

    let byte_2 = 0b00000000;
    const mask_QR = 0b10000000;
    if (messageFields.QR === true) {
        byte_2 = mask_QR;
    }

    // Opcode is written from 3rd bit,
    // so * 8 shifts it 3 bits left, i.e.: 0b0000 0111 * 0x8 => 0b0011 1000
    // and | is used to "megre" bits of QR and Opcode
    // const mask_Opcode = 0b01111000;
    byte_2 = byte_2 | (messageFields.Opcode * 8);

    // const mask_AA = 0b00000100;
    if (messageFields.AA === true) {
        byte_2 = byte_2 | (1 * 4);      // 1 * 4 => 0b0000 0100
    }

    // const mask_TC = 0b00000010;
    if (messageFields.TC === true) {
        byte_2 = byte_2 | (1 * 2);      // 1 * 2 => 0b0000 0010
    }

    // const mask_RD = 0b00000001;
    if (messageFields.RD === true) {
        byte_2 = byte_2 | 1;            // 0b0000 0001
    }

    buf.writeUInt8(byte_2, currentByteIndex);
    currentByteIndex++;

    let byte_3 = 0b00000000;
    const mask_RA = 0b10000000;
    if (messageFields.RA === true) {
        byte_3 = byte_3 | mask_RA;
    }

    // Z is always 0, reserved for future use (c) RFC 1035 4.1.1. Header section format
    // But let's assign it anyways
    // const mask_Z = 0b01110000;
    byte_3 = byte_3 | (messageFields.Z * 8);        // " * 8 " shifts value 3 bits left

    // const mask_RCODE = 0b00001111;

    byte_3 = byte_3 | messageFields.RCODE;

    buf.writeUInt8(byte_3, currentByteIndex);
    currentByteIndex++;

    buf.writeUInt16BE(messageFields.QDCOUNT, currentByteIndex);
    currentByteIndex += 2;

    buf.writeUInt16BE(messageFields.ANCOUNT, currentByteIndex);
    currentByteIndex += 2;

    buf.writeUInt16BE(messageFields.NSCOUNT, currentByteIndex);
    currentByteIndex += 2;

    buf.writeUInt16BE(messageFields.ARCOUNT, currentByteIndex);
    currentByteIndex += 2;

    messageFields.questions.forEach(question => {
        const labelsArr = question.domainName.split('.');
        labelsArr.forEach(label => {
            const labelLength = label.length;
            buf.writeUInt8(labelLength, currentByteIndex);
            currentByteIndex++;

            buf.write(label, currentByteIndex, labelLength, 'ascii');
            currentByteIndex += labelLength;
        });
        // '0' label length designates that domain name writing is completed
        buf.writeUInt8(0, currentByteIndex);
        currentByteIndex++;

        buf.writeUInt16BE(question.qtype, currentByteIndex);
        currentByteIndex += 2;

        buf.writeUInt16BE(question.qclass, currentByteIndex);
        currentByteIndex += 2;
    });


    ['answers', 'authorities', 'additionals'].forEach(function(section, i, arr) {
        if (messageFields[section]) {

            messageFields[section].forEach(sectionItem => {
                const labelsArr = sectionItem.domainName.split('.');
                labelsArr.forEach(label => {
                    const labelLength = label.length;
                    buf.writeUInt8(labelLength, currentByteIndex);
                    currentByteIndex++;

                    buf.write(label, currentByteIndex, labelLength, 'ascii');
                    currentByteIndex += labelLength;
                });
                // '0' label length designates that domain name writing is completed
                buf.writeUInt8(0, currentByteIndex);
                currentByteIndex++;

                buf.writeUInt16BE(sectionItem.type, currentByteIndex);
                currentByteIndex += 2;

                buf.writeUInt16BE(sectionItem.class, currentByteIndex);
                currentByteIndex += 2;

                buf.writeUInt32BE(sectionItem.ttl, currentByteIndex);
                currentByteIndex += 4;      // TTL is 32 bits

                buf.writeUInt16BE(sectionItem.rdlength, currentByteIndex);
                currentByteIndex += 2;

                sectionItem.rdata_bin.copy(buf, currentByteIndex, 0, sectionItem.rdata_bin.length);
                currentByteIndex += sectionItem.rdata_bin.length;
            });
        }

    });

    const bufEventual = Buffer.from(buf.buffer, 0, currentByteIndex);   // currentByteIndex here is not next byte to read, but merely length of buffer area to copy
    return bufEventual;
}
