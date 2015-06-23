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

		//btns
		this.game.load.spritesheet('play-game', 'imgs/btn-jogar.png', 150, 55);
		this.game.load.spritesheet('help-screen', 'imgs/btn-ajuda.png', 150, 55);
		this.game.load.image('close-help', 'imgs/btn-close-help.png');
		this.game.load.image('hud', 'imgs/balls_huds.png');
		this.game.load.spritesheet('pause-screen', 'imgs/btn-pause.png', 46, 50);

		//imgs
		this.game.load.image('snow-flake', 'imgs/snow-flake.png');
		this.game.load.image('logo-noel', 'imgs/logo-gogo-noel.png');

		this.game.load.image('help-view', 'imgs/help-screen.png');

		this.game.load.spritesheet('gifts', 'imgs/gifts.png', 50, 50);
		

	},

	create: function() {
		this.game.state.start('PlayState');
	}
};