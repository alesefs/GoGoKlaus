GoGoKlaus.testGame = function(game) {
	noel = null;

	gifts = null;
	giftTimeDelay = 0;
	giftDelay = 3;
};

GoGoKlaus.testGame.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		noel = this.game.add.sprite(20, this.game.world.centerY, 'noel');
		this.game.physics.enable(noel);
		noel.body.collideWorldBounds = true;
		noel.body.enable = true;

		gifts = this.game.add.group();
		gifts.enableBody = true;
    	this.game.physics.enable(gifts);
   	},

	update: function(){
		giftTimeDelay += this.time.elapsed/1000;
		if(giftTimeDelay > giftDelay){
            giftTimeDelay = 0;
            giftDelay = 3;
            this.createGifts();
		}

		if(noel.x != 20){
			noel.x = 20;
		}

		if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown){
			noel.y -= 5;
    	} else {
    		noel.y += 5;
    	}

    	//this.game.physics.arcade.collide(gifts, noel, this.getGifts);

    	this.game.physics.arcade.collide(noel, gifts, this.collisionCallback, this.processCallback, this);
	},

	createGifts: function(){
		var gift = gifts.create(500 , this.game.rnd.integerInRange(50, 350), 'gifts', this.game.rnd.integerInRange(0, 5));
        gift.physicsBodyType = Phaser.Physics.ARCADE;
        gift.scale.set(0.6);
        gift.body.velocity.x = -200;
	},

	/*getGifts: function(noel, gift){
		gift.kill();
	},*/

	processCallback: function(obj1, obj2) {
		obj2.kill();
	},

	collisionCallback: function(obj1, obj2) {
    	this.game.stage.backgroundColor = '#992d2d';
	},
	
	render: function() {
		this.game.debug.body(noel);
	}

};