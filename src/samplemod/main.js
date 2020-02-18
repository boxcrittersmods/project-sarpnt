const testDiv = document.createElement('div');
testDiv.className = "row justify-content-center"

testDiv.innerHTML = `======succesful!======`

function start() {
	document.getElementsByClassName('client')[0].appendChild(testDiv);
	console.log("Hello I am a sample mod");
	socket.on("M", () => {
		console.log(Object.keys(world.room.players).length + " Players are online");
	});
}
{
	let w = World.prototype.login;
	World.prototype.login = (t) => {
		w(t)
		start();
	};
}