
const PROTO_PATH = './protos/getInfo.proto';

const grpc = require('grpc');
const https = require('https');

const getInfo_proto = grpc.load(PROTO_PATH).getInfo;

/**
 * Implements the SayHello RPC method.
 */
function getAccountBalance(call, callback) {
  https.get({
    host: 'blockchain.info',
    path: `/balance?active=${call.request.account}`
  }, function (response) {
    var body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      callback(null, { payload: 'Account ' + body });
    });
  });
}

function getLastestBlock(call, callback) {
  https.get({
    host: 'blockchain.info',
    path: '/latestblock'
  }, function (response) {
    var body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      console.log(body)
      callback(null, { payload: 'Latestblock ' + body });
    });
  });
}





function main() {
  var server = new grpc.Server();
  server.addService(getInfo_proto.getInfoService.service, { getAccountBalance, getLastestBlock });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
