var net = require('net');
var logger = require('intel');

logger.addHandler(new logger.handlers.File('dns-server.log'));
logger.addHandler(new logger.handlers.Console());

var server = net.createServer();

server.on('connection', handleConnection);
server.listen(9000, ()=>logger.info('server is listening to '+ server.address()));
logger.info('server is listening');

function handleConnection(connection) {
    let remoteAddress = connection.remoteAddress + ":" + connection.remotePort;
    connection.on('data', onConnectionData());
    connection.once('close', () => logger.info('connection is closed'));
    connection.on('error', (error)=>logger.error(`connection error {$error}`))
}
