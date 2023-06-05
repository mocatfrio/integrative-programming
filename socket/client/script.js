// Client side
const socket = io();

// mengirim message ke server
socket.emit("message", "Hi");

// menerima notifikasi dari server
socket.on("notification", (data) => {
	console.log(`New notification: ${data}`);
});
