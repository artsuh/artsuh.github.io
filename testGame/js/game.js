window.player || (window.player = {});
window.extinguisher || (window.extinguisher = {});
window.endGame || (window.endGame = {});
window.level1 || (window.level1 = {});
window.currentLevel = 'level1';

var GameInitialize = function() {
	var currentLevel = "level1";
	var progressBar;

	new function createProgressBar() {
		progressBar = document.createElement("div");
		progressBar.id = "progressBar";
		document.body.appendChild(progressBar);
	};

	var Q = Quintus({audioSupported:['ogg'] })
		.include("Sprites, Anim, Scenes, Input, 2D, Touch, UI")
		.setup({
			width: 1000,
			height: 600,
			development: true
		}).controls().touch();

	window.GameEngine = Q;

	Q.include("Audio").enableSound();

	//player
	window.player.init(Q);

	//enemy
	window.extinguisher.init(Q);

	//end game
	window.endGame.init(Q);

	//level1
	window.level1.init(Q);

//load assets
	Q.load("Tiles.png, player.png, enemy1.png, lvl_01.tmx, bg.ogg", function() {
		document.getElementById("progressBar").style.display = 'none';
		Q.sheet("tiles","Tiles.png", { tilew: 50, tileh: 50});
		Q.sheet("player", "player.png", {tilew: 75, tileh: 75, sx: 0, sy: 0});
		Q.sheet("enemy1", "enemy1.png", {tilew: 75, tileh: 75, sx: 0, sy: 0});
		Q.stageScene("level1");
//          Q.audio.play('bg.ogg', {loop: true});
	}, {
		progressCallback: function(loaded,total) {
			progressBar.innerHTML = "<p>Loaded "+loaded+"/"+total+"</p>";
		}
	});
}