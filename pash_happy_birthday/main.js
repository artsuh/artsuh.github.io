Game = {
	firstTile: null,
	secondTile: null,
	canPick: true,
	stage: null,
	renderer: null,
	tileAtlas: ['images.json'],
	loader: null,
	gameContainer: null,
	choosenTiles: []
};

Game.run = function() {

	this.stage = new PIXI.Stage(0x363636);
	this.renderer = new PIXI.autoDetectRenderer(640, 480);
	this.loader = new PIXI.AssetLoader(this.tileAtlas);
	this.gameContainer = new PIXI.DisplayObjectContainer();
	this.stage.addChild(this.gameContainer);
	document.body.appendChild(this.renderer.view);
	this.loader.onComplete = this.loadingComplete;
	this.loader.load();
}

Game.loadingComplete = function() {
	Game.initChoosenTiles();
	Game.shuffleChoosenTiles();
	Game.initGameArea();
	Game.playBg();
}

Game.initChoosenTiles = function() {
	while (this.choosenTiles.length < 48) {
		var candidate = Math.floor(Math.random() * 44);
		if(this.choosenTiles.indexOf(candidate) == -1) {
			this.choosenTiles.push(candidate, candidate);
		}
	}
}

Game.shuffleChoosenTiles = function () {
	for(i=0; i<96; i++) {
		var from = Math.floor(Math.random() * 48);
		var to = Math.floor(Math.random() * 48);
		var tmp = this.choosenTiles[from];
		this.choosenTiles[from] = this.choosenTiles[to];
		this.choosenTiles[to] = tmp;
	}
}

Game.initGameArea = function () {
	for(i=0; i<8; i++) {
		for(j=0; j<6; j++) {
			var tile = PIXI.Sprite.fromFrame(this.choosenTiles[i*6+j]);
			tile.buttonMode = true;
			tile.interactive = true;
			tile.isSelected = false;
			tile.theVal = this.choosenTiles[i * 6 + j];
			tile.position.x = 7 + i * 80;
			tile.position.y = 7 + j * 80;
			tile.tint = 0x000000;
			tile.alpha = 0.5;
			this.gameContainer.addChild(tile);
			tile.mousedown = tile.touchstart = function() {
				if(Game.canPick) {
					if(!this.isSelected) {
						this.isSelected = true;
						this.tint = 0xffffff;
						this.alpha = 1;

						Game.playSelectAudio();
						if(Game.firstTile == null)
							Game.firstTile = this;
						else {
							Game.secondTile = this;
							Game.canPick = false;
							if(Game.firstTile.theVal == Game.secondTile.theVal) {
								setTimeout(function() {
									Game.gameContainer.removeChild(Game.firstTile);
									Game.gameContainer.removeChild(Game.secondTile);
									Game.firstTile = null;
									Game.secondTile = null;
									Game.canPick = true;
								}, 1000);
							} else {
								setTimeout(function() {
									Game.firstTile.isSelected = false;
									Game.secondTile.isSelected = false;
									Game.firstTile.tint = 0x000000;
									Game.secondTile.tint = 0x000000;
									Game.firstTile.alpha = 0.5;
									Game.secondTile.alpha = 0.5;
									Game.firstTile = null;
									Game.secondTile = null;
									Game.canPick = true;
								}, 1000);
							}
						}
					}
				}
			};
		}
	}

	requestAnimFrame(Game.animate);
}

Game.animate = function() {
	var finish = Game.gameContainer.children == 0;
	if(!finish) {
		requestAnimFrame(Game.animate);
		Game.renderer.render(Game.stage);	
	} else {
		alert("GET U GIFT!!!");
	}
	
}

Game.playBg = function() {
	var sound = new Howl({
  		urls: ['nyancat-loop.wav'],
  		loop: true,
  		volume: 0.4
	}).play();
}

Game.playSelectAudio = function() {
	var soundName = Math.random() > 0.5 ? "fire.wav" : "yes_bitch.wav";
	var sound = new Howl({
		urls: [soundName],
	}).play();
}


