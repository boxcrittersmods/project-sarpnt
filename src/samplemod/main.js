var songpitch = 440

var genEvent = new (require('./events.js'))()
//import WebMidi from 'webmidi'
var input = new (require('./input.js'))()

/*genEvent.add("init", () => {
	context = new AudioContext()
})*/

var testDiv = document.createElement('div')
testDiv.className = 'row justify-content-center'
testDiv.innerHTML =
	`<select id="" name="">
		<option value="0">Sine</option>
		<option value="1">Triangle</option>
		<option value="3">Square</option>
	</select>`

function start() {
	document.getElementsByClassName('client')[0].appendChild(testDiv)

	/*socket.on("M", () => {
		console.log(Object.keys(world.room.players).length + " Players are online")
	})*/
}

{
	let w = World.prototype.login
	World.prototype.login = (t) => {
		w(t)
		start()
	}
}