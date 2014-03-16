AJL({
	name: "My styles",
	assets: ['css/style.css'],
	config: {
		async: false
	}
}, {
	name: "Web fonts",
	assets: ['//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js'],
	config: {
		async: false
	}
}, {
	name: "Quintus",
	assets: ['lib/quintus.js', 'lib/quintus_2d.js', 'lib/quintus_anim.js', 'lib/quintus_audio.js',
	'lib/quintus_input.js', 'lib/quintus_scenes.js', 'lib/quintus_sprites.js', 'lib/quintus_touch.js',
	'lib/quintus_ui.js'],
	config: {
		async: false
	}
}, {
	name: "Game",
	assets: ["js/game.js"],
	config: {
		async: false
	}
}).loadAll();

