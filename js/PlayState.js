GoGoKlaus.PlayState = function(game) {
	//logo = null;
	groupBuilds = null;
	build = null;
	b_n = 4;
};

GoGoKlaus.PlayState.prototype = {
	create: function() {
		this.game.world.setBounds(0, 0, 600, 400);
		this.game.stage.backgroundColor = '#15162d';

		//logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo-full');
		//logo.anchor.setTo(0.5, 0.5);

		for(var i = 0; i < b_n; i++){
			build = this.game.add.bitmapData(600, 400);
			build.context.fillStyle = '#000000';
			build.context.fillRect(150*i, 600, 145, -this.game.rnd.integerInRange(400, 475));
			this.game.add.sprite(0, 0, build);
		}


   	},

	update: function(){
		
	}
	
};