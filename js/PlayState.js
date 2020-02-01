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


	/*main menu zone vars*/
	logoNoel = null;
	btnPlay = null;
	btnReplay = null;
	btnHelp = null;
	btnMenu = null;
	btnFace = null;

	/*score rank*/
	rectScore = null;
	rankMainText = null;
	score = 0;
	bestScore = localStorage.getItem("davids") || 0;

	/*help vars*/
	helpSceen = null;
	btnCloseHelp = null;

	inMenu = true;
	inGame = false;
	gameOver = false;
	gameOverTimer = 3;

	gameOverText = null;
	recoveryGiftsText = null;

	limits = null;

	snowhills = null;
	catchSnow = 0;
	snowTimeDelay = 0;
	snowDelay = 2;


	gifts = null;
	catchGifts = 0;
	giftTimeDelay = 0;
	giftDelay = 10;


	blockeds = null;
	catchBlockeds = 0;
	blockedTimeDelay = 0;
	blockedDelay = 12;
	blockedMode = 0;

	explosion = null
	varX = 0;
	varY = 0;

	noel = null;


	/*pause/return/sound/mute*/
	btnPause = null;
	btnResume = null;
	btnSound = null;
	btnMute = null;
	stylePause = null;
	pauseText = null;
	soundbtn = 0;


	/*sounds*/
	giftFx = null;
	builderFx = null;
	airplaneFx = null;
	collisionFx = null;
	bgsFx = null;
	goFx = null;
};

GoGoKlaus.PlayState.prototype = {
	create: function() {
		this.game.world.setBounds(0, 0, 600, 400);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		myBitmap = this.game.add.bitmapData(600, 400);
		this.game.add.sprite(0, 0, myBitmap);
		
		for(var i = 0; i < countHill; i++){
			superHills = this.game.add.graphics(0, 0);
			superHills.beginFill(0x1d1f2a);
			superHills.alpha = 1;
	    	superHills.moveTo(50 + i*(middleHill), this.game.rnd.integerInRange(275, 325));
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

		snowFlake = this.game.add.emitter(300, -150, 50);
		snowFlake.makeParticles('snow-flake');
		snowFlake.gravity = 0.3;
		snowFlake.start(false, 8000, 2);
	

		logoNoel = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 40, 'logo-noel');
		logoNoel.anchor.setTo(0.5, 0.5);

		rectScore = this.game.add.graphics(0, 0);
		rectScore.beginFill(0x37B48A, 1);
    	rectScore.drawRect(this.game.world.width - 140, this.game.world.centerY + 95, 140, 80);

		helpSceen = this.game.add.sprite(700, 0, 'help-view');
		helpSceen.anchor.setTo(0, 0);

		btnMenu = this.game.add.button(this.game.world.centerX - 100, 730, 'btns', this.menuGame, this, 4, 4, 4);
		btnMenu.anchor.setTo(0.5,0.5);
		btnMenu.scale.setTo(0.65, 0.65);
		btnMenu.input.useHandCursor = true;

		btnPlay = this.game.add.button(this.game.world.centerX - 60, this.game.world.centerY + 130, 'btns', this.startGame, this, 1, 1, 1);
		btnPlay.anchor.setTo(0.5,0.5);
		btnPlay.scale.setTo(0.65, 0.65);
		btnPlay.input.useHandCursor = true;

		btnReplay = this.game.add.button(this.game.world.centerX, 730, 'btns', this.restartGame, this, 1, 1, 1);
		btnReplay.anchor.setTo(0.5,0.5);
		btnReplay.scale.setTo(0.65, 0.65);
		btnReplay.input.useHandCursor = true;

		btnHelp = this.game.add.button(this.game.world.centerX + 60, this.game.world.centerY + 130, 'btns', this.openHelp, this, 0, 0, 0);
		btnHelp.anchor.setTo(0.5,0.5);
		btnHelp.scale.setTo(0.65, 0.65);
		btnHelp.input.useHandCursor = true;

		btnFace = this.game.add.button(this.game.world.centerX + 100, 730, 'btns', this.openFace, this, 5, 5, 5);
		btnFace.anchor.setTo(0.5,0.5);
		btnFace.scale.setTo(0.65, 0.65);
		btnFace.input.useHandCursor = true;

		btnCloseHelp = this.game.add.button(630, 0, 'close-help', this.closeHelp, this, 0, 0, 0);
		btnCloseHelp.anchor.setTo(0, 0);
		btnCloseHelp.input.useHandCursor = true;

		btnPause = this.game.add.button(this.game.world.centerX + 175, -75, 'btns', this.pauseGame, this, 2, 2, 2);
		btnPause.anchor.setTo(0, 0);
		btnPause.scale.setTo(0.4, 0.4);
		btnPause.input.useHandCursor = true;

		btnResume = this.game.add.button(this.game.world.centerX + 175, -75, 'btns', this.pauseGame, this, 3, 3, 3);
		btnResume.anchor.setTo(0, 0);
		btnResume.scale.setTo(0.4, 0.4);
		btnResume.input.useHandCursor = true;

		btnSound = this.game.add.button(this.game.world.centerX + 225, 5, 'btns', this.soundGame, this, 6, 6, 6);
		btnSound.anchor.setTo(0, 0);
		btnSound.scale.setTo(0.4, 0.4);
		btnSound.input.useHandCursor = true;

		btnMute = this.game.add.button(this.game.world.centerX + 225, -75, 'btns', this.soundGame, this, 7, 7, 7);
		btnMute.anchor.setTo(0, 0);
		btnMute.scale.setTo(0.4, 0.4);
		btnMute.input.useHandCursor = true;
		
		huds = this.game.add.sprite(20, -200, 'hud');
		huds.anchor.setTo(0, 0);
		huds.scale.setTo(0.25, 0.25);

		stylePause = { font: "50px Ruge Boogie", fill: "#ff0044", align: "left", stroke: "#ff0044", strokeThickness: 2 };
		styleHuds = { font: "20px Ruge Boogie", fill: "#ffffff", align: "center"};
		styleScore = { font: "30px Ruge Boogie", fill: "#ffffff", align: "center"};
		styleOver = { font: "75px Ruge Boogie", fill: "#ffffff", align: "center", stroke: "#c0c0c0", strokeThickness: 2 };
		
		metersText = this.game.add.text(50, -60, "0", styleHuds);
		giftsText = this.game.add.text(50, -60, "0", styleHuds);

		rankMainText = this.game.add.text(this.game.world.width - 130, this.game.world.centerY + 110, "Maior Recuperação: \n " + bestScore, styleHuds);


		gameOverText = this.game.add.text(100, -120, "GAME OVER", styleOver); 
		recoveryGiftsText = this.game.add.text(200, -80, "Presentes Recuperados: \n" + score, styleScore); 


		limits = this.game.add.sprite(-100, 0, 'limits');
		this.game.physics.enable(limits);
		limits.body.immovable = true;
		limits.body.enable = true;
		limits.anchor.setTo(0, 0);

		snowhills = this.game.add.group();
		snowhills.enableBody = true;
		this.game.physics.enable(snowhills);

    	noel = this.game.add.sprite(100, this.game.world.centerY, 'noel');
		noel.anchor.setTo(0.5, 0.5);
		this.game.physics.enable(noel);
		noel.animations.add('walk');
		noel.animations.play('walk', 5, true);
		noel.body.collideWorldBounds = true;
		noel.body.enable = true;
		noel.body.setSize(100, 90, -30, 10);
		noel.scale.setTo(0.8, 0.8);
		noel.alpha = 0;

    	gifts = this.game.add.group();
		gifts.enableBody = true;
		this.game.physics.enable(gifts);

		blockeds = this.game.add.group();
		blockeds.enableBody = true;
		this.game.physics.enable(blockeds);


    	explosion = this.game.add.emitter(varX, varY, 1000);
		explosion.makeParticles('snow-flake');
		explosion.gravity = 200;
		


		giftFx = this.game.add.audio('giftFx');
		builderFx = this.game.add.audio('builderFx');
		airplaneFx = this.game.add.audio('airplaneFx');
		collisionFx = this.game.add.audio('collisionFx');
		goFx = this.game.add.audio('goFx');
		bgsFx = this.game.add.audio('bgsFx');
		
		
		//this.game.physics.arcade.enable([limits, noel, gifts]);
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
		if(inMenu){
			grd = myBitmap.context.createLinearGradient(0,0,0,400);
			grd.addColorStop(0,"#141625");
			grd.addColorStop(100/400,"#171F2C");
			grd.addColorStop(200/400,"#1E2434");
			grd.addColorStop(300/400,"#222939");
			myBitmap.context.fillStyle = grd;
			myBitmap.context.fillRect(0,0,600,400);
		}
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

		this.game.add.tween(rectScore).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(rankMainText).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
	},
	closeHelp: function(){
		this.game.add.tween(helpSceen).to({ x: 700 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnCloseHelp).to({ x: 630 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add.tween(logoNoel).to({ y: this.game.world.centerY - 40 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add.tween(rectScore).to({ y: 0 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(rankMainText).to({ y: this.game.world.centerY + 110 }, 500, Phaser.Easing.Linear.None, true);
	},

	pauseGame: function(){
		btnResume.y = 5;
		pauseText = this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY - 50, "PAUSA", stylePause);
		this.game.paused = true;
		/*this.game.input.onDown.add(function(){
			if(event.x >= 0  && event.y >= 0){
				btnResume.y = -75;
				pauseText.destroy();
				pause = false;
				this.game.paused = false;
			}
		}, this);*/
		this.game.input.onDown.add(function () {
			if(this.game.paused){
				btnResume.y = -75;
				pauseText.destroy();
				pause = false;
				this.game.paused = false;
			}
		},this);
	},

	soundGame: function(){
		soundbtn += 1;

		if(soundbtn % 2 == 0){
			this.game.add.tween(btnSound).to({ y: 5 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(btnMute).to({ y: -75 }, 150, Phaser.Easing.Linear.None, true);
			bgsFx.pause();
			
			collisionFx.volume = 0;
			airplaneFx.volume = 0;
			giftFx.volume = 0;
			goFx.volume = 0;
			builderFx.volume = 0;
		} else {
			this.game.add.tween(btnSound).to({ y: -75 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(btnMute).to({ y: 5 }, 150, Phaser.Easing.Linear.None, true);
			//bgsFx.resume();
			bgsFx.play('', 0, 0.3, true);
			bgsFx.onLoop.add(this.playLevelMusic, this);

			collisionFx.volume = 0.5;
			airplaneFx.volume = 0.5;
			giftFx.volume = 0.5;
			goFx.volume = 0.5;
			builderFx.volume = 0.5;
		}
	},

	playLevelMusic: function() {
		bgsFx.play('', 0, 0.3, true);
	},
	
	startGame: function(){
		this.game.add.tween(logoNoel).to({ y: 600 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add.tween(rectScore).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(rankMainText).to({ y: 730 }, 500, Phaser.Easing.Linear.None, true);
		
		inGame = true;
	},

	restartGame: function(){
		inGame = true;
		gameOver = false;

		giftTimeDelay = 0;
		giftDelay = 5;
		towardDelay = 15;
		towardTimeDelay = 0;
		towardMode = 0;
		snowDelay = 2;
		snowTimeDelay = 0;
		meters = 0;
		score = 0;

		this.game.add.tween(gameOverText).to({ y: -150 }, 50, Phaser.Easing.Linear.None, true);
		this.game.add.tween(recoveryGiftsText).to({ y: -125 }, 50, Phaser.Easing.Linear.None, true);

		this.game.add.tween(btnReplay).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnMenu).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnFace).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
	},

	overGame: function(){
		gameOverTimer -= this.time.elapsed/1000;
		noel.alpha = 0;

		if(gameOverTimer <= 2){
			this.game.add.tween(btnPause).to({ y: -75 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(btnResume).to({ y: -75 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(huds).to({ y: -200 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(giftsText).to({ y: -60 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(metersText).to({ y: -60 }, 150, Phaser.Easing.Linear.None, true);

			this.game.add.tween(gameOverText).to({ y: this.game.world.centerY - 150 }, 50, Phaser.Easing.Linear.None, true);
			this.game.add.tween(recoveryGiftsText).to({ y: this.game.world.centerY - 25 }, 50, Phaser.Easing.Linear.None, true);

			bestScore = localStorage.getItem("davids", score) || 0;
			if (score > bestScore){
	            localStorage.setItem("davids", score);
	            recoveryGiftsText.text = "Presentes Recuperados: \n" + score + " Recorde!";
	        }
	        rankMainText.text = "Maior Recuperação: \n " + bestScore;
	        recoveryGiftsText.text = "Presentes Recuperados: \n" + score;
		} 
		if (gameOverTimer <= 0){
			this.game.add.tween(btnReplay).to({ y: this.game.world.centerY + 130 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(btnMenu).to({ y: this.game.world.centerY + 130 }, 150, Phaser.Easing.Linear.None, true);
			this.game.add.tween(btnFace).to({ y: this.game.world.centerY + 130 }, 150, Phaser.Easing.Linear.None, true);
		}
	},

	openFace: function(){
		window.open ('https://www.facebook.com/dialog/feed?app_id=668955493239235&link=http://www.dhaw.co.nf/&picture=http://c1.staticflickr.com/1/420/19199921291_274741349e.jpg&name=Noel, Salve o natal!&caption=http://www.dhaw.co.nf/&description=Eu recuperei ' + score  + ' presentes. Você pode me vencer?&redirect_uri=http://www.dhaw.co.nf/');
	},

	menuGame: function(){
		inGame = false;
		gameOver = false;

		giftTimeDelay = 0;
		giftDelay = 5;
		blockedDelay = 15;
		blockedTimeDelay = 0;
		blockedMode = 0;
		snowDelay = 2;
		snowTimeDelay = 0;
		meters = 0;
		score = 0;
		
		this.game.add.tween(gameOverText).to({ y: -150 }, 50, Phaser.Easing.Linear.None, true);
		this.game.add.tween(recoveryGiftsText).to({ y: -125 }, 50, Phaser.Easing.Linear.None, true);

		this.game.add.tween(btnReplay).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnMenu).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnFace).to({ y: 730 }, 150, Phaser.Easing.Linear.None, true);

		this.game.add.tween(logoNoel).to({ y: this.game.world.centerY - 40 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnPlay).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(btnHelp).to({ y: this.game.world.centerY + 130 }, 500, Phaser.Easing.Linear.None, true);

		this.game.add.tween(rectScore).to({ y: 0 }, 500, Phaser.Easing.Linear.None, true);
		this.game.add.tween(rankMainText).to({ y: this.game.world.centerY + 110 }, 500, Phaser.Easing.Linear.None, true);
	},

	onGame: function(){
		this.game.add.tween(btnPause).to({ y: 5 }, 150, Phaser.Easing.Linear.None, true);
		
		this.game.add.tween(huds).to({ y: 5 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(giftsText).to({ y: 6 }, 150, Phaser.Easing.Linear.None, true);
		this.game.add.tween(metersText).to({ y: 31 }, 150, Phaser.Easing.Linear.None, true);

		meters += this.time.elapsed/1000;
		giftsText.text = score;
		metersText.text = Math.round(meters);

		noel.alpha = 1;
		if (noel.x != 100){
			noel.x = 100;
		}
		if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown){
			noel.y -= 5;
    	} else {
    		noel.y += 5;
    	}


		snowTimeDelay += this.time.elapsed/1000;
		if(snowTimeDelay > snowDelay){
            snowTimeDelay = 0;
            snowDelay = 4;
            this.createSnowHill();
		}

		giftTimeDelay += this.time.elapsed/1000;
		if(giftTimeDelay > giftDelay){
            giftTimeDelay = 0;
            giftDelay = this.game.rnd.integerInRange(3, 7);
            this.createGifts();
		}

		blockedTimeDelay += this.time.elapsed/1000;
		if(blockedTimeDelay > blockedDelay){
            blockedTimeDelay = 0;
            blockedDelay = this.game.rnd.integerInRange(3, 10);
            blockedMode = this.game.rnd.integerInRange(0, 8);
            this.createBlocked();
		}
 
		this.game.physics.arcade.collide(gifts, limits, this.getLimitsI);
		this.game.physics.arcade.collide(blockeds, limits, this.getLimitsII);
		this.game.physics.arcade.collide(snowhills, limits, this.getLimitsIII);
		this.game.physics.arcade.collide(noel, gifts, this.collisionCallback, this.processCallbackGifts, this);
		this.game.physics.arcade.collide(noel, blockeds, this.collisionCallback, this.processCallbackBlockeds, this);
	},

	createSnowHill: function(){
		for(var i = 0; i < 2; i++){
			var Hill = snowhills.create(600 + i*75, this.game.rnd.integerInRange(320, 390), 'snow-hill');
        	Hill.body.velocity.x = -50;
		}
	},
	getLimitsIII: function(limits, hill){
		hill.kill();
	},



	createGifts: function(){
		var gift = gifts.create(600 , this.game.rnd.integerInRange(50, 350), 'gifts', this.game.rnd.integerInRange(0, 5));
        this.game.physics.enable(gift, Phaser.Physics.ARCADE);
        gift.anchor.setTo(0.5, 0.5);
        gift.scale.setTo(0.6, 0.6);
        gift.body.velocity.x = -200;
	},
	processCallbackGifts: function(noel, gift){
		gift.kill();
		if(inGame){
			score += 1;
			giftFx.play();
		} else {
			score += 0;
		}
	},
	getLimitsI: function(limits, gift){
		gift.kill();
	},


	createBlocked: function(){
		switch(blockedMode){
			case 0: 
				var blocked = blockeds.create(600 , 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
		        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
		        blocked.anchor.setTo(0.5, 0.5);
		        blocked.body.velocity.x = -200;
		        builderFx.play();
		        break;
		    case 1:
		    	for(var i = 0; i < 2; i++){
					var blocked = blockeds.create(600 + i*100, 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        builderFx.play();      
				}
				break;
			case 2:
		    	for(var i = 0; i < 3; i++){
					var blocked = blockeds.create(600 + i*100 + 75, 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        builderFx.play();      
				}
				break;
			case 3:
		    	for(var i = 0; i < 3; i++){
					var blocked = blockeds.create(600 + (i*100) + 10, 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        builderFx.play();      
				}
				break;
			case 4:
		    	for(var i = 0; i < 4; i++){
					var blocked = blockeds.create(600 + (i*100) + 10, 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        builderFx.play();      
				}
				break;
			case 5:
		    	for(var i = 0; i < 5; i++){
					var blocked = blockeds.create(600 + (i*100) + 10, 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        builderFx.play();     
				}
				break;
			case 6:
					var blocked = blockeds.create(600, this.game.rnd.integerInRange(50, 300), 'airplane');
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.animations.add('fly');
					blocked.animations.play('fly', 50, true);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        airplaneFx.play();      
				break;
			case 7:
		    	for(var i = 0; i < 2; i++){
					var blocked = blockeds.create(600 + (i*150) + 10, this.game.rnd.integerInRange(50, 300), 'airplane');
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.animations.add('fly');
					blocked.animations.play('fly', 50, true);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200; 
			        airplaneFx.play();     
				}
				break;
			case 8:
				for(var i = 0; i < 2; i++){
					var blocked = blockeds.create(600 + (i*150), 25, 'airplane');
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.animations.add('fly');
					blocked.animations.play('fly', 50, true);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        airplaneFx.play();
			    }
		        for(var i = 0; i < 3; i++){
					var blocked = blockeds.create(600 + i*100 + 75, 325, 'tower-s', this.game.rnd.integerInRange(0, 3));
			        this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			        blocked.anchor.setTo(0.5, 0.5);
			        blocked.body.velocity.x = -200;
			        builderFx.play();      
				}     
				break;
			default:
				break;
		}	
	},
	processCallbackBlockeds: function(noel, blocked){
		explosion.x = 120;
    	explosion.y = blocked.y - 20;
		explosion.start(true, 2000, null, 100);
		blocked.kill();
		collisionFx.play();
		inGame = false;
		gameOver = true;
		goFx.play();
	},
	getLimitsII: function(limits, blocked){
		blocked.kill();
	}/*,
	
	render: function() {
	    this.game.debug.body(noel);
	    blockeds.forEach(this.renderblockeds, this);
	},

	renderblockeds: function(s) {
        this.game.debug.body(s, 'rgba(230,200,255,0.4)', true);
    }*/


    /*collisionCallback: function(obj1, obj2) {
    	this.game.stage.backgroundColor = '#992d2d';
	},*/
	
	
};