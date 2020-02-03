'use strict';

const net = require('net');
const logger = require('intel');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

logger.addHandler(new logger.handlers.File('dns-server.log'));
logger.addHandler(new logger.handlers.Console());
const resourceFilePath = argv.file;

const HEADER_LENGTH = 16;

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
    let content = fs.readFileSync(resourceFilePath);
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
    let parts = recordStr.split(" ");
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
