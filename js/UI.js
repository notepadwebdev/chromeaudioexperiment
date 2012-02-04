	
	/*
	 * 	UI class
	 */
	UI = function(options) {
		if (options) {}
		this.player = $('#player');	
		this.init();
		this.addDiscs();
	}
	
	UI.prototype.init = function(){
		
		var obj = this;
		this.lattice = $('#lattice');
		this.disc = $('div', this.lattice);
		this.mixer = $('#mixer');
	
		$(window)
			.resize(this.onResize)
			.mousemove(function(e){
				obj.player.css({
					'left': e.pageX+20,
					'top': e.pageY-20
				});
			});
		
		$('a').filter('.toggleBtn').each(function(i, el){
				
				// Parse labels
				var labels = $(el).html().split('|');
				$(el).html('<label>'+labels[0]+'</label>');
				
				$(el)
					.fadeIn(1600)
					.append('<span class="LED"></span>')
					.click(function(e){ 
						if ($(this).hasClass('on')) {
							$(this)		// switch off
								.removeClass('on').trigger('toggleOff')
								.find('label').html(labels[0]);
						} else {
							$(this)		// switch on
								.addClass('on').trigger('toggleOn')
								.find('label').html(labels[1]);
						}
						return false;
					});
			});
		
		$('#transport, #mixer').hover(
			function(){ 
				$('#mixer').show();
				obj.player.addClass('nodot');
			}, 
			function(){ 
				$('#mixer').hide();
				obj.player.removeClass('nodot');
			});
	}
	
	UI.prototype.onResize = function(e){				
		var w = $(window).width();
		var h = $(window).height();				
	}
	
	UI.prototype.addDiscs = function(){
		
		var h = $(window).height()  - $('#transport').height();
		var w = $(window).width();
		var dw = this.disc.width();
		var cols = Math.floor(w / dw);
		var rows = Math.floor(h / dw);
		var offset = (w - (cols * dw)) / 2;
		var l = Math.floor(cols*rows) ;

		for (var x=1; x<l; x++) {
			this.disc.clone().prependTo(this.lattice);
		}
		this.lattice.css({
			'paddingLeft': offset+'px',
			'paddingTop': offset+'px'
		}).addClass('loaded');
	}