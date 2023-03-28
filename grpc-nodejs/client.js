// Import package 
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

// Define proto path 
const PROTO_PATH = "./mahasiswa.proto"

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// Load service 
const MahasiswaService = grpc.loadPackageDefinition(packageDefinition).MahasiswaService;

// Define client 
const client = new MahasiswaService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
)

module.exports = client;