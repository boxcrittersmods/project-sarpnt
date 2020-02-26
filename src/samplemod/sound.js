module.exports = class {
	constructor() {
		this.playingnotes = []
	}

	start(note) {
		if (!this.ctx) this.ctx = new AudioContext()
		var osc = this.ctx.createOscillator()
		osc.type = 'sine'
		osc.frequency.setValueAtTime(440, this.ctx.currentTime);
		osc.start()

		//$('.key')[n].style['background-color'] = 'red'

		console.log(note)
		this.playingnotes.unshift({ sound: osc, note: note })
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