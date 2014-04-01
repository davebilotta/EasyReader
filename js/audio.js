function playWord(word) {

	game.sound.play(wordNames[word.framename].toLowerCase());

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

	var w;
	for (var i = 0; i < wordArray.length; i ++) {
		w = wordArray[i].toLowerCase();

		game.load.audio(w,'audio/words/' + w + '.mp3');
		game.add.audio(w);
		sounds[i] = w;
	}
	game.load.start();
	game.load.onLoadComplete.add(loadComplete,this);
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