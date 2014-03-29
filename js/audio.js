function playWord(word) {

	var id = word.framename;
	var text = wordNames[id];
	console.log("Playing word " + text + " ... id (" + id + ")");
}

function playPhrase() {
	for (var i = 0; i < words.length; i ++) {
		highlightWord(words[i]);
		playWord(words[i]);
	}
}