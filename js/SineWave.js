
	/*
	 * 		SineWave class
	 * 		
	 *		Plays wave forms with frequency and amplitude control
	 */
	SineWave = function(context, options) {
		var obj = this;
		this.context = context;
		
		this.node = this.context.createScriptProcessor(1024, 1, 1);
		this.gainNode = this.context.createGain();
		this.node.connect(this.gainNode);
		this.gainNode.connect(this.context.destination);
		this.sampleRate = 44100;
		this.x = 0;
		
		this.amplitude = (options.amp) ? options.amp : 0.5;
		this.originalAmplitude = this.amplitude;
		this.decay = options.decay;
		
		this.frequency = 440;
		this.next_frequency = 440;
		this.node.onaudioprocess = function(e) { 
			obj.process(e) 
		};
	}
	SineWave.prototype.process = function(e) {
		
		var data = e.outputBuffer.getChannelData(0);
		
		if (this.decay) this.amplitude *= this.decay;
		
		for (var i = 0; i < data.length; ++i) {
			
			data[i] = this.amplitude * Math.sin(this.x++ / (this.sampleRate / (this.frequency * 2 * Math.PI)));
			
			// Change freq? Only if wave nr 0
			if (this.next_frequency != this.frequency)  {
				next_data = this.amplitude * Math.sin(this.x++ / (this.sampleRate / 2 * Math.PI * this.frequency));
				if (data[i] < 0.001 && data[i] > -0.001 && data[i] < next_data) {
					this.frequency = this.next_frequency;
					this.x = 0;
				}
			}
		}
	}
	
	SineWave.prototype.setFrequency = function(n) {
		this.next_frequency = n;
	}
	
	SineWave.prototype.setAmplitude = function(n) {
		this.amplitude = n;
	}
	
	SineWave.prototype.play = function() {
		this.setAmplitude(this.originalAmplitude);
		this.gainNode.connect(this.context.destination);
	}
	
	SineWave.prototype.pause = function() {
		this.gainNode.disconnect();
	}
