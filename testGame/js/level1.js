(function(exports) {
	window.level1 = new function() {
		this.init = function(Q) {
			Q.scene("level1",function(stage) {

				var background = new Q.TileLayer({ dataAsset: 'lvl_01.tmx', layerIndex: 0, sheet: 'tiles', tileW: 50, tileH: 50, type: Q.SPRITE_NONE });

				stage.collisionLayer(new Q.TileLayer({ dataAsset: 'lvl_01.tmx', layerIndex:1,  sheet: 'tiles', tileW: 50, tileH: 50}));
				stage.insert(background);

				var player = stage.insert(new Q.Player());

				stage.insert(new Q.Extinguisher({x:662, y: 0}));
				stage.insert(new Q.Extinguisher({x:500, y: 1623}));
				stage.insert(new Q.Extinguisher({x:2313, y: 0}));
				stage.insert(new Q.Extinguisher({x:3955, y: 100}));

				stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h});
			});
		};
	};
})(window.level1);