(function(exports) {

	window.player = new function() {
		this.init = function(Q) {
			Q.Sprite.extend("Player",{
				init: function(p) {
					this._super(p, {
						x: 290,
						y: 0,
						jumpSpeed: -690,
						sprite: "player",
						sheet: 'player',
						scale: 2,
						jumpCount: 0
					});
					this.add('2d, platformerControls, animation');
				},
				step: function(dt) {

					if(this.p.vx > 0) {
						this.p.flip = false;
						this.play("run_right");
					} else if (this.p.vx < 0) {
						this.p.flip = 'x';
						this.play("run_left");
					}
					else
					{
						this.play("stand_" + this.p.direction);
					}
				}
			});

			Q.animations('player', {
				run_right: {frames: [4, 5, 6, 7, 8, 9, 10, 11], next: 'stand_right', rate: 1/5},
				run_left: {frames: [4, 5, 6, 7, 8, 9, 10, 11], next: 'stand_left', rate: 1/5},
				stand_right: {frames: [0, 1], rate: 1/4},
				stand_left: {frames: [0, 1], rate: 1/4}
			});
		};
	};

})(window.player);