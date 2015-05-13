GoGoKlaus.Preloader = function(game) {};
GoGoKlaus.Preloader.prototype = {
	preload: function() {
		this.game.world.setBounds(0, 0, 600, 400);
		//background
		this.game.stage.backgroundColor = '#15162d';

		//loading
		this.preloadBg = this.add.sprite(((this.game.world.width - 300)/2), ((this.game.world.height - 125)/2), 'preloaderBg');
		this.preloadBar = this.add.sprite(((this.game.world.width - 300)/2), ((this.game.world.height - 125)/2), 'preloaderBar');
		this.game.load.setPreloadSprite(this.preloadBar);


		//this.game.load.image('logo-full', 'imgs/logo-full.png');
	},

	create: function() {
		this.game.state.start('PlayState');
	}
};