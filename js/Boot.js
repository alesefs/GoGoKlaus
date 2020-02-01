var GoGoKlaus = {};
GoGoKlaus.Boot = function(game) {};
GoGoKlaus.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'imgs/logo-nil.png');
		this.load.image('preloaderBar', 'imgs/logo-full.png');
	},

	create: function() {
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		this.scale.forceOrientation(true, true);
		this.game.input.maxPointers = 1;
		this.game.state.start('Preloader');
	}
};