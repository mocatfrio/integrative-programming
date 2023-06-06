const express = require("express");
const socketio = require("socket.io");

const path = require("path");
const app = express();

// Mengakses file client
app.use(express.static(path.resolve(__dirname, "client")));

// Define route
app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "index.html"));
	// res.send("Hello from Codedamn");
});

const server = app.listen(1337, () => {
	console.log("Server running!");
});

// Socket IO
const io = socketio(server);

io.on("connection", (socket) => {
	console.log(`New connection: ${socket.id}`);

	// Membuat fungsi
	// menerima message dari client
	socket.on("message", (data) => {
		console.log(`New message from ${socket.id}: ${data}`);
	});

	// mengirim notifikasi
	socket.emit("notification", "Thanks for connecting to Codedamn!");
});
