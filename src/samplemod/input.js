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