(function(exports) {
	window.extinguisher = new function() {
		this.init = function(Q)
		{
			Q.Sprite.extend("Extinguisher",{
				init: function(p) {
					this._super(p, { sheet: 'enemy1', sprite: 'enemy1', vx: -120 });
					this.add('2d, aiBounce, animation');

					this.on("bump.left,bump.right,bump.bottom",function(collision) {
						if(collision.obj.isA("Player")) {
							Q.stageScene("endGame",1, { label: "You Died" });
							collision.obj.destroy();
						}
					});

					this.on("bump.top",function(collision) {
						if(collision.obj.isA("Player")) {
							this.destroy();
							collision.obj.p.vy = -300;
						}
					});
				},
				step: function(dt) {
					var dirX = this.p.vx/Math.abs(this.p.vx);
					var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
					var nextTile = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);

					if(!nextTile && ground) {
						if(this.p.vx > 0) {
							if(this.p.direction == "right") {
								this.p.flip = "x";
							}
							else {
								this.p.flip = false;
							}
						}
						else {
							if(this.p.direction == "left") {
								this.p.flip = "x";
							}
							else {
								this.p.flip = false;
							}
						}
						this.p.vx = -this.p.vx;
					}

					if(this.p.vx > 0) {
						this.p.flip="x";
						this.play("run_right");
					} else if(this.p.vx < 0) {
						this.p.flip="";
						this.play("run_left");
					}
					else
					{
						this.play("stand_" + this.p.direction);
					}
				}
			});

			Q.animations('enemy1', {
				stand_left: {frames: [0, 1], rate: 1/2},
				stand_right: {frames: [0, 1], rate: 1/2},
				run_right: {frames: [2, 3], next: 'stand_right', rate: 1/4},
				run_left: {frames: [2, 3], next: 'stand_left', rate: 1/4}
			});
		}
	};
})(window.extinguisher);