GoGoKlaus.PlayState = function(game) {
	/*bg zone vars*/
	countHill = 8;
	middleHill = 75;
	Hills = null;
	superHills = null;
	DaynNite = 0;
	timeGame = 0;
	snowFlake = null;
	myBitmap = null;
	grd = null;

	/*hud*/
	huds = null;
	metersText = null;
	meters = 0;
	giftsText = null;
	styleHuds = null;
	score = 0;


	/*main menu zone vars*/
	logoNoel = null;
	btnPlay = null;
	btnReplay = null;
	btnHelp = null;
	btnMenu = null;

	/*help vars*/
	helpSceen = null;
	btnCloseHelp = null;


	inGame = false;
	gameOver = false;

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

		myBitmap = this.game.add.bitmapData(600, 400);
		this.game.add.sprite(0, 0, myBitmap);
		grd = myBitmap.context.createLinearGradient(0,0,0,400);
		grd.addColorStop(0,"#141625");
		grd.addColorStop(100/400,"#171F2C");
		grd.addColorStop(200/400,"#1E2434");
		grd.addColorStop(300/400,"#222939");
		myBitmap.context.fillStyle = grd;
		myBitmap.context.fillRect(0,0,600,400);

		for(var i = 0; i < countHill; i++){
			superHills = this.game.add.graphics(0, 0);
			superHills.beginFill(0xc0c0c0);
			superHills.alpha = 1;
	    	superHills.moveTo(50 + i*(middleHill), this.game.rnd.integerInRange(335, 375));
	    	superHills.lineTo(-50 + i*(middleHill), 400);
	    	superHills.lineTo(100 + i*(middleHill), 400);
	    	superHills.endFill();
		}

		for(var i = 0; i < countHill; i++){
			Hills = this.game.add.graphics(0, 0);
			Hills.beginFill(0xffffff);
	    	Hills.moveTo(50 + i*(middleHill), this.game.rnd.integerInRange(350, 390));
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

		btnMenu = this.game.add.button(this.game.world.centerX - 100, 730, 'menu-screen', this.menuGame, this, 1, 0, 2);
		btnMenu.anchor.setTo(0.5,0.5);

		btnPlay = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 130, 'play-game', this.startGame, this, 1, 0, 2);
		btnPlay.anchor.setTo(0.5,0.5);

		btnReplay = this.game.add.button(this.game.world.centerX + 100, 730, 'play-game', this.restartGame, this, 1, 0, 2);
		btnReplay.anchor.setTo(0.5,0.5);

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
		styleHuds = { font: "20px Ruge Boogie", fill: "#ffffff", align: "left"};
		
		metersText = this.game.add.text(50, -60, "0", styleHuds);
		giftsText = this.game.add.text(50, -60, "0", styleHuds);

		gifts = this.game.add.group();
		gifts.enableBody = true;
    	gifts.physicsBodyType = Phaser.Physics.ARCADE;
    	
   	},

	update: function(){

		this.changeBg();
		
		if(inGame){
			this.onGame();
		}

		if(gameOver){
			this.overGame();
		}
	},

	changeBg: function(){
		if(inGame){
			//this.game.stage.backgroundColor = '#15162d';
			grd = myBitmap.context.createLinearGradient(0,0,0,400);
			grd.addColorStop(0,"#141625");
			grd.addColorStop(100/400,"#171F2C");
			grd.addColorStop(200/400,"#1E2434");
			grd.addColorStop(300/400,"#222939");
			myBitmap.context.fillStyle = grd;
			myBitmap.context.fillRect(0,0,600,400);
		}
		if(gameOver){
			//this.game.stage.backgroundColor = '#C20000';
			grd = myBitmap.context.createLinearGradient(0,0,0,400);
			grd.addColorStop(0,"#9A0000");
			grd.addColorStop(100/400,"#B40202");
			grd.addColorStop(200/400,"#C20000");
			grd.addColorStop(300/400,"#ff0000");
			myBitmap.context.fillStyle = grd;
			myBitmap.context.fillRect(0,0,600,400);	
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

	restartGame: function(){
		inGame = true;
		gameOver = false;

		giftTimeDelay = 0;
		giftDelay = 10;
		meters = 0;

		this.game.add.tween(btnReplay).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnMenu).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
	},

	overGame: function(){
		this.game.add.tween(btnPause).to({ y: -60 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(huds).to({ y: -60 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(giftsText).to({ y: -60 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(metersText).to({ y: -60 }, 150, Phaser.Easing.Linear.None, true);

		this.game.add.tween(btnReplay).to({ y: this.game.world.centerY + 130 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnMenu).to({ y: this.game.world.centerY + 130 }, 150, Phaser.Easing.Linear.None, true);
	},

	menuGame: function(){
		inGame = false;
		gameOver = false;

		giftTimeDelay = 0;
		giftDelay = 10;
		meters = 0;
		
		this.game.add.tween(btnReplay).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnMenu).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);

		this.game.add.tween(logoNoel).to({ y: this.game.world.centerY - 40 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);

		//facebook
		window.open ('https://www.facebook.com/dialog/feed?app_id=668955493239235&link=http://www.dhaw.co.nf/&picture=http://c1.staticflickr.com/1/420/19199921291_274741349e.jpg&name=Noel, Salve o natal!&caption=http://www.dhaw.co.nf/&description=Eu recuperei ' + giftDelay  + ' presentes. Você pode me vencer?&redirect_uri=http://www.dhaw.co.nf/');

	},

	onGame: function(){
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

		if(meters >= 10){
			inGame = false;
			gameOver = true;
		}
	},

	createGifts: function(){
		var gift = gifts.create(600 , this.game.rnd.integerInRange(50, 350), 'gifts', this.game.rnd.integerInRange(0, 5));
        gift.anchor.set(0.5);
        gift.scale.set(0.75, 0.75);
        gift.body.velocity.x = -100;
	}


	
	
};