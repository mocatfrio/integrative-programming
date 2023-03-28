# Implementation of gRPC API and Protobuf in Node JS

## Goals

We will build basic CRUD application using gRPC API and Protobuf in NodeJS.

## CRUD Functions

### Proto file
```protobuf
// Service 
service MahasiswaService {
  // Create 
  rpc AddMahasiswa (Mahasiswa) returns (Mahasiswa) {}
  // Read 
  rpc GetAll (Empty) returns (MahasiswaList) {}
  rpc GetMahasiswa (MahasiswaId) returns (Mahasiswa) {}
  // Update
  rpc EditMahasiswa (Mahasiswa) returns (Mahasiswa) {}
  // Delete
  rpc DeleteMahasiswa (MahasiswaId) returns (Empty) {}
}
```

### Server
Dummy data

```js
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
```

Add Service in server.js

```js

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
```

### Main file
We need new js file to test our application, named **run.js**

```js
const client = require("./client");

// read data 
client.getAll({}, (error, mahasiswa) => {
  if (!error) {
    console.log('successfully fetch data')
    console.log(mahasiswa)
  } else {
    console.error(error)
  }
})

// add mahasiswa 
client.addMahasiswa(
  {
    id: "3",
    nama: "Rudi",
    nrp: "5119",
    nilai: 90
  },
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully create data')
      console.log(mahasiswa)
    } else {
      console.error(error)
    }
  }
)

// edit mahasiswa 
client.editMahasiswa(
  {
    id: "2",
    nama: "Budi edited",
    nrp: "5118 edited",
    nilai: 100
  },
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully edit data')
      console.log(mahasiswa)
    } else {
      console.error(error)
    }
  }
)

// delete mahasiswa 
client.deleteMahasiswa(
  {
    id: "2"
  }, 
  (error, mahasiswa) => {
    if (!error) {
      console.log('successfully delete data')
      console.log(mahasiswa)
    } else {
      console.error(error)
    }
  }
)
```


## Screenshot
Use `npm start` to start the server and `node run` to start the client.

![ss1](./img/ss1.png)

## Assignments

1. Make connection to the database (such as MongoDB etc)
2. Modify the existing CRUD function so that it can update data in the database

Optional but preferred:

3. Use the HTTP server and create endpoints to call our gRPC service procedures.

    For example:
    
    * **/mahasiswa** GET endpoint will call the getAll to get all mahasiswa in the database.
    * **/mahasiwa/:id/edit** POST will call the editMahasiswa to edit an item.

      etc.

4. Add simple UI 

## Others
* Markdown Guide: https://www.markdownguide.org/basic-syntax/
    
