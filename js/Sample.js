			
			/*
			 * 		Sample class
			 *
			 *		Loads and plays audio files
			 */
			Sample = function(context, options) {
				
				if (!options.url) {
					alert('Unable to create saaple without a valid options.url');
					return;
				}
				
				var obj = this;
				this.context = context;
				this.url = options.url;
				this.loop = options.loop;
				this.onLoad = options.onLoad;
				
				this.gainNode 		= this.context.createGainNode();
				this.source 			= this.context.createBufferSource();
				this.source.loop 	= this.loop;
				this.buffer				= null;
				
				this.source.connect(this.gainNode);
				this.gainNode.connect(this.context.destination);
				
				this.load(this.context);
			}
			Sample.prototype.load = function(context){
				var obj = this;
				var request = new XMLHttpRequest();
				request.open('GET', this.url, true);
				request.responseType = 'arraybuffer';
				request.onload = function() {
					context.decodeAudioData(request.response, 
						function(buffer) {
							obj.buffer = buffer;
							if (typeof obj.onLoad == "function") obj.onLoad(obj);	// callback
						}, 
						function(){
							console.log('error decoding audio');
						});
				}
				request.send();
			}
			Sample.prototype.play = function(buffer, time){
				this.source 			= this.context.createBufferSource();
				this.source.buffer 	= this.buffer;
				this.source.loop 	= this.loop;
				
				this.source.connect(this.gainNode);
				this.gainNode.connect(this.context.destination);
				//this.setGain(1);
				this.source.noteOn(time);
			}
			Sample.prototype.stop = function() {
				this.source.disconnect();
				this.gainNode.disconnect();
			}
			Sample.prototype.setLoop = function(bool){
				this.loop = bool;
			}
			Sample.prototype.setPlaybackRate = function(n){
				this.source.playbackRate = n;
			}
			Sample.prototype.setGain = function(n){
				this.gainNode.gain.value = n;
			}	