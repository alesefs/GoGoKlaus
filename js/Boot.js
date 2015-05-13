var GoGoKlaus = {};
GoGoKlaus.Boot = function(game) {};
GoGoKlaus.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'imgs/logo-nil.png');
		this.load.image('preloaderBar', 'imgs/logo-full.png');
	},

	create: function() {
		this.game.input.maxPointers = 1;
		this.game.state.start('Preloader');
	}
};