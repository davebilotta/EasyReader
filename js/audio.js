function playWord(word) {
	var x = 0;
	var snd = fileName(wordNames[word.framename]);
	console.log("ms " + snd.duration);

	game.sound.play(snd);
		console.log("ms " + snd.duration);
	while (x < 100) {
	if (snd.isPlaying) {
	      console.log("playing");
	}
	else {
		console.log("not playing");
	}
	x++}
}

function fileName(name) {
	// returns a file name (puncuation stripped, lower case)
	return name.toLowerCase().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`'~()]/g,"");
}

function playPhrase() {
	for (var i = 0; i < words.length; i ++) {
		highlightWord(words[i]);
		// TODO: This needs to trigger event when playing is done
		playWord(words[i]);
	}
}

function loadAudioForWord(wordArray) {
	// w will be an array of words
	sounds = [];
	//var test = game.load.audio('test','audio/words/banana.mp3');
	//test = game.add.audio(test);
	//game.load.start();
	//console.log(test.totalDuration);
	//var snd = new Phaser.Sound(this,'test');
	//var dur = game.soundconsole.log()

	var snd;
	var w;
	for (var i = 0; i < wordArray.length; i ++) {
		w = fileName(wordArray[i]);

		game.load.audio(w,'audio/words/' + w + '.mp3');
		snd = game.add.audio(w);
		sounds[i] = w;
	}
	game.load.start();
}

function markerComplete() {
	console.log("marker complete");
}

function loadComplete() {
	console.log("load complete");
}

function disposeAudio() {
	// w will be an array of words

	for (var i = 0; i < sounds.length; i ++) {
		console.log("disposing of sound asset for " + sounds[i.framename]);
	}
}