var PROTO_PATH = './protos/getInfo.proto';

var grpc = require('grpc');
var getInfo_proto = grpc.load(PROTO_PATH).getInfo;

var client = new getInfo_proto.getInfoService('localhost:50051',
  grpc.credentials.createInsecure());

//Read command Line  
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you want to know? ', (answer) => {
  switch (answer) {
    case 'getAccountBalance':
      getAccountBalance();
      break;
    case 'getLastestBlock':
      getLastestBlock();
      break;
    default:
      break;
  }
  rl.close();
});



function getAccountBalance() {
  var account;
  if (process.argv.length >= 3) {
    account = process.argv[2];
  } else {
    account = '12Vji8DJLgPEowfcEaGqjopueTCH9EsFim'; //default sample account
  }
  client.getAccountBalance({ account }, function (err, response) {
    console.log('Balance:', response.payload);
  });
}


function getLastestBlock() {
  client.getLastestBlock({}, function (err, response) {
    console.log('LastestBlock:', response.payload);
  });
}
