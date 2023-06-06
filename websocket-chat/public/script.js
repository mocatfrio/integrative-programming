var socket = io();

// Memberikan notifikasi bahwa client/user join chatroom
socket.emit("joining msg", name);

// Terjadi didalam form
$("form").submit(function (e) {
	// will prevent page reloading
	e.preventDefault();

	// Mengirim pesan
	socket.emit("chat message", name + ":  " + $("#m").val());
	$("#messages").append($('<li id="list">').text("You:  " + $("#m").val()));
	$("#m").val("");
	return false;
});

// fungsi mengirim pesan
socket.on("chat message", function (msg) {
	$("#messages").append($("<li>").text(msg));
});
