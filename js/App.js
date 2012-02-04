	$(document).ready(function(){
	
		// Create global context through which all sound will be output
		var context;
		try {
			context = new webkitAudioContext();
		}
		catch(e) {
			alert('Web Audio API is not supported in this browser. Use CHROME.');
		}
		
		// Tempo track
		context.bpm = 99;
		context.eighthNoteTime = (60 / context.bpm) / 2;
		context.startTime = context.currentTime + 0.500;
		
		var C 			= 220;	// Frequency of lowest note
		var sine 		= new SineWave(context, {amp: 0.45, decay: 0.65});
		var loop1 	= new Sample(context, { url: 'audio/organ-echo-chords.wav', loop: true });
		var loop2 	= new Sample(context, { url: 'audio/coolloop7.wav', loop: true });
		var loop3 	= new Sample(context, { url: 'audio/break29.wav', loop: true });
		var samples = [loop1, loop2, loop3];
		
		// The canvas
		var canvas = document.getElementById('canvas');
		var stage = canvas.getContext("2d");
		var ui = new UI();
		
		// Disc sounds 
		$('.disc')
			.mouseenter(function(e){
					var pos = $(e.target).closest('.disc').index() ;
					var freq = C + ( pos * (C * 1 / 12) ) ;		// Roughly a semitone per disc, very roughly
					sine.setFrequency( freq ) ;
					sine.play();
				})
			.mousedown(function(e){})
			.click(function(e){});
		
		$('#loop1').bind('toggleOn', function(){ loop1.play(); }).bind('toggleOff', function(){ loop1.stop(); });
		$('#loop2').bind('toggleOn', function(){ loop2.play(); }).bind('toggleOff', function(){ loop2.stop(); });
		$('#loop3').bind('toggleOn', function(){ loop3.play(); }).bind('toggleOff', function(){ loop3.stop(); });
			
		$('#loop1vol').slider({
					value: 100,
					orientation: "vertical",
					slide: function(e, ui) { 
						loop1.setGain(ui.value/100);
					}
			});
		$('#loop2vol').slider({
					value: 100,
					orientation: "vertical",
					slide: function(e, ui) { 
						loop2.setGain(ui.value/100);
					}
			});
		$('#loop3vol').slider({
					value: 100,
					orientation: "vertical",
					slide: function(e, ui) { 
						loop3.setGain(ui.value/100);
					}
			});
			
		$('#waveType')
			.bind('toggleOn', function(){ 
				ui.lattice.add('body').addClass('squares');
			})
			.bind('toggleOff', function(){ 
				ui.lattice.add('body').removeClass('squares'); 
			});
});
