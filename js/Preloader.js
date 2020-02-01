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
		this.game.load.image('close-help', 'imgs/btn-close-help.png');
		this.game.load.image('hud', 'imgs/rects_huds.png');
		this.game.load.spritesheet('btns', 'imgs/new-btns.png', 100, 100);

		//imgs
		this.game.load.image('snow-flake', 'imgs/snow-flake.png');
		this.game.load.image('limits', 'imgs/limits.jpg');
		this.game.load.image('logo-noel', 'imgs/logo-gogo-noel.png');

		this.game.load.image('help-view', 'imgs/help-screen.png');

		this.game.load.spritesheet('gifts', 'imgs/gift-s.png', 50, 50);
		this.game.load.spritesheet('tower-s', 'imgs/towers.png', 100, 175);
		this.game.load.spritesheet('airplane', 'imgs/airplane.png', 100, 60, 3);
		this.game.load.spritesheet('noel', 'imgs/santas.png', 175, 100, 4);
		this.game.load.image('snow-hill', 'imgs/snow-hill.png');


		//snds
		this.game.load.audio('giftFx', ['http://dc707.4shared.com/img/qwMzd4aRce/d353ac0e/dlink__2Fdownload_2FqwMzd4aRce_2Fgift.mp3_3Ftsid_3D20150727-044148-f1e6d93_26lgfp_3D7200_26sbsr_3D368f1b443d89bfabf778ac121a3440d41321cd88f9b6837a/preview.mp3', 'snds/gift.mp3', 'snds/gift.ogg']);
		this.game.load.audio('builderFx', ['http://dc707.4shared.com/img/KjIyaRqAce/b73f690a/dlink__2Fdownload_2FKjIyaRqAce_2Fbuilder.mp3_3Ftsid_3D20150727-043912-dcd582d7_26lgfp_3D7200_26sbsr_3Dbee82839c17db4c4ad12dc8e1c73fcb42ba0490232410705/preview.mp3', 'snds/builder.mp3', 'snds/builder.ogg']);
		this.game.load.audio('airplaneFx', ['http://dc707.4shared.com/img/c2vY7hhPba/edbaa471/dlink__2Fdownload_2Fc2vY7hhPba_2Fairplane.mp3_3Ftsid_3D20150727-043506-c0ebe031_26lgfp_3D7200_26sbsr_3D668d5ee4b22f7d75039a08e5f7475df4722525ff4623c6c4/preview.mp3', 'snds/airplane.mp3', 'snds/airplane.ogg']);
		this.game.load.audio('collisionFx', ['http://dc707.4shared.com/img/YwLQZlfNce/a9499c52/dlink__2Fdownload_2FYwLQZlfNce_2Fcollision.mp3_3Ftsid_3D20150727-044013-31af724b_26lgfp_3D7200_26sbsr_3D09b66de83c697dfc4ef6c5af91d4786f45f5ade6a3f329c/preview.mp3', 'snds/collision.mp3', 'snds/collision.ogg']);
		this.game.load.audio('bgsFx', ['http://dc707.4shared.com/img/JLaJNsduce/90cd5034/dlink__2Fdownload_2FJLaJNsduce_2Fbgsound.mp3_3Ftsid_3D20150727-043814-134d5a5b_26lgfp_3D7200_26sbsr_3Da148123a227dbd4b05b7bfa0eabc2b7471f4e86b212b235d/preview.mp3', 'snds/bgsound.mp3', 'snds/bgsound.ogg']);
		this.game.load.audio('goFx', ['http://dc707.4shared.com/img/__9599Ojce/62b1268f/dlink__2Fdownload_2F_5F_5F9599Ojce_2Fgameover.mp3_3Ftsid_3D20150727-044113-17776a43_26lgfp_3D7200_26sbsr_3D37d48e8b77354d9024b146d1c3556b9971d46b77f3a9a3d4/preview.mp3', 'snds/bgsound.mp3', 'snds/gameover.ogg']);
	},

	create: function() {
		this.game.state.start('PlayState');
	}
};