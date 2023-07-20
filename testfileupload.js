// load required packages
const fs = require('fs');
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/service.proto'
// load file_uploader.proto to load the gRPC data contract
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const endpoint = 'localhost:50051';
const fileUploaderProto = grpc.loadPackageDefinition(packageDefinition).blog;
const serviceStub = new fileUploaderProto.Blog(endpoint, grpc.credentials.createInsecure());
// call service stub method and add callback to get the final response
const serviceCall = serviceStub.uploadFile((err, response) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(response);
    }
});
// write the stream data to the service stub method instance
serviceCall.write({
    name: 'environment.jpeg'
});
// read file stream and send the data to server as BYTES
const readStream = fs.createReadStream('./wiki/environment.jpg');
readStream.on('data', (chunk) => {
    console.log("HEEE", chunk.length)
    serviceCall.write({
        chunk: Uint8Array.from(chunk)
    });
});
// once file reading is complete then terminate the gRPC streaming request
readStream.on('end', () => {
    serviceCall.end();
});