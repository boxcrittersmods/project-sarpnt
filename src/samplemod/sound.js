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
		for (let i in this.playingnotes) {
			var s = this.playingnotes[i]
			if (s.note == note) {
				s.sound.stop()
				this.playingnotes.splice(i, 1)
				break
			}
		}
		//genEvent.send('noteStop', n)
		//$('.key')[n].style = {}
	}
}