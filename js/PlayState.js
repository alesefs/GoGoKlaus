GoGoKlaus.PlayState = function(game) {
	/*bg zone vars*/
	countHill = 8;
	middleHill = 75;
	Hills = null;
	DaynNite = 0;
	timeGame = 0;
	snowFlake = null;

	/*hud*/
	huds = null;
	metersText = null;
	meters = 0;
	giftsText = null;


	/*main menu zone vars*/
	logoNoel = null;
	btnPlay = null;
	btnHelp = null;

	/*help vars*/
	helpSceen = null;
	btnCloseHelp = null;


	inGame = false;

	gifts = null;
	catchGifts = 0;
	giftTimeDelay = 0;
	giftDelay = 10;




	/*pause/return*/
	btnPause = null;
	btnResume = null;
	stylePause = null;
	pauseText = null;
};

GoGoKlaus.PlayState.prototype = {
	create: function() {
		this.game.world.setBounds(0, 0, 600, 400);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#15162d';

		for(var i = 0; i < countHill; i++){
			Hills = this.game.add.graphics(0, 0);
			Hills.beginFill(this.game.rnd.integerInRange(0x000025, 0x000000));
	    	Hills.moveTo(50 + i*(middleHill), this.game.rnd.integerInRange(150, 300));
	    	Hills.lineTo(-50 + i*(middleHill), 400);
	    	Hills.lineTo(100 + i*(middleHill), 400);
	    	Hills.endFill();
		}

		for (var i = 0; i < 5; i++){
			snowFlake = this.game.add.emitter(0 + i*120, -10, 50);
			snowFlake.makeParticles('snow-flake');
			snowFlake.gravity = 0.3;
			snowFlake.start(false, 4000, 2);
		}
	

		logoNoel = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 40, 'logo-noel');
		logoNoel.anchor.setTo(0.5, 0.5);

		btnPlay = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 130, 'play-game', this.startGame, this, 1, 0, 2);
		btnPlay.anchor.setTo(0.5,0.5);

		btnHelp = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY + 130, 'help-screen', this.openHelp, this, 1, 0, 2);
		btnHelp.anchor.setTo(0.5,0.5);

		helpSceen = this.game.add.sprite(700, 0, 'help-view');
		helpSceen.anchor.setTo(0, 0);

		huds = this.game.add.sprite(20, -60, 'hud');
		huds.anchor.setTo(0, 0);

		btnCloseHelp = this.game.add.button(630, 0, 'close-help', this.closeHelp, this, 0, 0, 0);
		btnCloseHelp.anchor.setTo(0, 0);

		btnPause = this.game.add.button(this.game.world.centerX + 175, -60, 'pause-screen', this.pauseGame, this, 0, 0, 0);
		btnPause.anchor.setTo(0, 0);

		btnResume = this.game.add.button(this.game.world.centerX + 175, -60, 'pause-screen', this.pauseGame, this, 1, 1, 1);
		btnResume.anchor.setTo(0, 0);

		stylePause = { font: "50px Ruge Boogie", fill: "#ff0044", align: "left", stroke: "#ff0044", strokeThickness: 2 };
		styleHuds = { font: "20px Ruge Boogie", fill: "#ff0044", align: "left", stroke: "#ff0044", strokeThickness: 1 };

		metersText = this.game.add.text(50, -60, "0", styleHuds);
		giftsText = this.game.add.text(50, -60, "0", styleHuds);

		gifts = this.game.add.group();
		gifts.enableBody = true;
    	gifts.physicsBodyType = Phaser.Physics.ARCADE;
    	


		//this.game.physics.arcade.enable([ gifts ], Phaser.Physics.ARCADE);
		
   	},

	update: function(){
		
		timeGame += this.time.elapsed/1000;
		if(timeGame >= 240){
			timeGame = 0;	
		}

		if(Math.round(timeGame) >= 0 && Math.round(timeGame) < 60){
			this.game.stage.backgroundColor = '#15162d';
		} else if(Math.round(timeGame) >= 60 && Math.round(timeGame) < 90){
			this.game.stage.backgroundColor = '#815fa4';
		} else if(Math.round(timeGame) >= 90 && Math.round(timeGame) < 135){
			this.game.stage.backgroundColor = '#45cce7';
		} else if(Math.round(timeGame) >= 135 && Math.round(timeGame) < 200){
			this.game.stage.backgroundColor = '#457de7';
		} else {
			this.game.stage.backgroundColor = '#1a3fef';
		}

		if(inGame){
			this.game.add.tween(btnPause).to({ y: 5 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(huds).to({ y: 5 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(giftsText).to({ y: 6 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(metersText).to({ y: 31 }, 150, Phaser.Easing.Linear.None, true);

			meters += this.time.elapsed/1000;
			metersText.text = Math.round(meters);

			giftTimeDelay += this.time.elapsed/1000;
			if(giftTimeDelay > giftDelay){
	            giftTimeDelay = 0;
	            giftDelay = this.game.rnd.integerInRange(3, 10);
	            this.createGifts();
			}
			giftsText.text = Math.round(giftTimeDelay) + "/" + giftDelay;


		}

	},

	openHelp: function(){
		this.game.add.tween(helpSceen).to({ x: 100 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnCloseHelp).to({ x: 30 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add.tween(logoNoel).to({ y: 600 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
	},

	closeHelp: function(){
		this.game.add.tween(helpSceen).to({ x: 700 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnCloseHelp).to({ x: 630 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add.tween(logoNoel).to({ y: this.game.world.centerY - 40 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);
	},

	pauseGame: function(){
		this.game.paused = true;
		btnResume.y = 5;
		pauseText = this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY - 50, "PAUSED", stylePause);
			this.input.onDown.add(function(){
				if(event.x >= this.game.world.centerX + 175 &&
					event.x <= this.game.world.centerX + 225 &&
					event.y <= 60){
					this.game.paused = false;
					btnResume.y = -60;
					pauseText.destroy();
					pause = false;
				}
			}, this);
	},
	
	startGame: function(){
		this.game.add.tween(logoNoel).to({ y: 600 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		
		inGame = true;
	},

	createGifts: function(){
		var gift = gifts.create(600 , this.game.rnd.integerInRange(50, 350), 'gifts', this.game.rnd.integerInRange(0, 3));
        gift.anchor.set(0.5);
        gift.scale.set(0.75, 0.75);
        gift.body.velocity.x = -100;
	}


	
	
};