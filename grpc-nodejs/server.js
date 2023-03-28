// Import package 
const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

// Define Proto path 
const PROTO_PATH = './mahasiswa.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// Load Proto 
const mahasiswaProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// Dummy data 
let mahasiswa = {
  mahasiswa: [
    {
      id: "1",
      nama: "Rudi",
      nrp: "5119",
      nilai: 59
    },
    {
      id: "2",
      nama: "Budi",
      nrp: "5118",
      nilai: 60
    }
  ]
}

// Add service in proto 
server.addService(mahasiswaProto.MahasiswaService.service, {
  // Create
  addMahasiswa: (call, callback) =>  {
    const _mahasiswa = { ...call.request };
    mahasiswa.mahasiswa.push(_mahasiswa);
    callback(null, _mahasiswa);
  },
  // Read 
  getAll: (call, callback) => {
    callback(null, mahasiswa);
  },
  getMahasiswa: (call, callback) => {
    const mahasiswaId = call.request.id;
    const mahasiswaItem = mahasiswa.mahasiswa.find(({ id }) => mahasiswaId == id);
    callback(null, mahasiswaItem);
  },
  // Update
  editMahasiswa: (call, callback) => {
    const mahasiswaId = call.request.id;
    const mahasiswaItem = mahasiswa.mahasiswa.find(({ id }) => mahasiswaId == id);
    mahasiswaItem.nama = call.request.nama;
    mahasiswaItem.nrp = call.request.nrp;
    mahasiswaItem.nilai = call.request.nilai;
    callback(null, mahasiswaItem)
  },
  // Delete 
  deleteMahasiswa: (call, callback) => {
    const mahasiswaId = call.request.id;
    mahasiswa = mahasiswa.mahasiswa.filter(({ id }) => id !== mahasiswaId);
    callback(null, {mahasiswa});
  },
})

// Start server 
server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
)

