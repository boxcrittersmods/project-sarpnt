(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class {
	constructor() {
		this.listeners = {}
	}

	add(type, callback) {
		if (!(type in this.listeners))
			this.listeners[type] = []
		this.listeners[type].push(callback)
	}
	remove(type, callback) {
		if (type) {
			if (!(type in this.listeners)) return
			if (callback) {
				var stack = this.listeners[type]
				for (var i in stack) {
					if (stack[i] === callback) {
						stack.splice(i, 1)
						return
					}
				}
			}
			else this.listeners[type] = []
		}
		else this.listeners = {}
	}
	send(event, ...params) {
		if (!(event in this.listeners)) return true
		var stack = this.listeners[event].slice()

		for (var i in stack)
			stack[i].call(this, ...params)
	}
}
},{}],2:[function(require,module,exports){
module.exports = class {
	constructor() {
		this.playnote = new (require('./sound.js'))()
		this.midikey = {
			KeyZ: 0, KeyS: 1, KeyX: 2, KeyD: 3, KeyC: 4, KeyV: 5, KeyG: 6, KeyB: 7, KeyH: 8, KeyN: 9, KeyJ: 10, KeyM: 11, Comma: 12, KeyL: 13, Period: 14, Semicolon: 15, Slash: 16, KeyQ: 12, Digit2: 13, KeyW: 14, Digit3: 15, KeyE: 16, KeyR: 17, Digit5: 18, KeyT: 19, Digit6: 20, KeyY: 21, Digit7: 22, KeyU: 23, KeyI: 24, Digit9: 25, KeyO: 26, Digit0: 27, KeyP: 28, BracketLeft: 29, Equal: 30, BracketRight: 31
		}
		addEventListener("keydown", this.press.bind(this))
		addEventListener("keyup", this.unpress.bind(this))

		/*WebMidi.enable(function (err) {
			if (err) {
				console.log("Could not access your MIDI devices.", err)
				return
			}
			console.log("This browser supports WebMIDI!")

			//var inputs = WebMidi.inputs
			//var outputs = WebMidi.outputs

			for (var i of WebMidi.inputs) {
				i.addListener("noteon", "all", this.NoteOn)
				i.addListener("noteoff", "all", this.NoteOff)
			}
		})*/
	}

	press({ code: key }) {
		if (this.midikey[key] != undefined) {
			var note = this.midikey[key] + 4 * 12 //4 is octave
			/*for (let i in playingnotes) {
				if (playingnotes[i].note == note)
					return
			}*/
			this.playnote.start(note)
		}
	}

	unpress({ code: key }) {
		if (this.midikey[key] != undefined) {
			var note = this.midikey[key] + 4 * 12 //4 is octave
			this.playnote.stop(note)
		}
	}

	NoteOn({ note: { number } }) {
		this.playnote.start(number)
	}

	NoteOff({ note: { number } }) {
		this.playnote.stop(number)
	}
}
},{"./sound.js":4}],3:[function(require,module,exports){
var context
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
	context = new AudioContext()

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
},{"./events.js":1,"./input.js":2}],4:[function(require,module,exports){
module.exports = class {
	constructor() {
		this.playingnotes = []
	}

	start(note) {
		//genEvent.send('noteStart', n)

		//$('.key')[n].style['background-color'] = 'red'

		//start note sound
		console.log(note)
		this.playingnotes.unshift({ sound: 1, note: note })
	}

	stop(note) {
		var ntd
		for (let i in this.playingnotes) {
			var s = this.playingnotes[i]
			if (s.note == note) {
				ntd = s.sound
				this.playingnotes.splice(i, 1)

				break
			}
		}
		if (ntd)
			ntd.stop()
		//genEvent.send('noteStop', n)
		//$('.key')[n].style = {}
	}
}
},{}]},{},[3]);
