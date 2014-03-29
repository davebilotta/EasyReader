var defaultColor = '#002AD4';
var selectColor = '#ffffff';
var text;
var next = null;
var words = [];
var wordNames;

var wordSpacing = 25;
var width = 1024;
var height = 768;

var phrases = ["The dog is happy",
"I love you",
"A carrot is orange",
"A banana is yellow",
"Peanut butter and jelly",
"The cat has brown fur",
"The sun is out",
"An apple is red",
"The ice cream is cold",
"Tuna fish sandwich",
"Happy birthday"];

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { 
	preload: preload, 
	create: create,
	update: update 
});
 
function preload() {
}
 
function create() {
	words = game.add.group();
	//text = game.add.text(100,game.world.centerY,' ');

    buildMenuRegion();
    buildPhrase();
}
 
function update() {
}

function buildMenuRegion() {
	next = null;
	next = game.add.text(game.world.width - 70,0,">");
	next.inputEnabled = true;
	next.events.onInputDown.add(newWord, this);

	next.font = 'Helvetica';
    next.fontWeight = 'bold';
    next.fontSize = 70;
    next.fill = defaultColor;
}

function buildPhrase() {
	
	words = [];
	wordNames = [];
	var totalWidth;
	var newWord = getPhrase();
	var w = newWord.split(" ");

	var xPos = 20;
	for (var i =0; i< w.length; i++) {
		
		text = game.add.text(xPos,game.world.centerY,w[i]);
		//text.content = w[i];
		text.framename = i;
	 	text.inputEnabled = true;
    	text.events.onInputDown.add(wordClicked, this);
    	
    	text.font = 'Helvetica';
    	text.fontWeight = 'bold';
    	text.fontSize = 70;

		xPos += text.width + wordSpacing;

    	text.fill = defaultColor;

    	words[i] = text;
    	wordNames[i] = w[i];
    }
};

function wordClicked(word) {
	highlightWord(word);
	playWord(word);
}

function highlightWord(word) {
	unselectAll();

	// Highlight selected one
	words[word.framename].fill = selectColor;
	
}

function newWord() {
	unselectAll();

	playPhrase();
	clearScreen();	
}

function clearScreen() {
	var done = false;
	var tween;
	var word;
	for (var i = 0; i < words.length; i++) {
		word = words[i];

		tween = game.add.tween(word);
	    tween.to({x:3000, y:game.world.centerY},2000).start()
		.onComplete.addOnce(function() {
    		// only do last one
    		if (!done) {
    			
    			buildPhrase();
    			done = true;
    		}
    	});
	}
}

function unselectAll() {
	// TODO: this should probably be made more efficient to only unselect the current word

	for (var i = 0; i < words.length; i++) {
		words[i].fill = defaultColor;
	}
}

function selectAll() {
	for (var i = 0; i < words.length; i++) {
		words[i].fill = selectColor;
	}
}
//function playWord(word) {
//	// this will play the audio file for the word
//}

function getPhrase() {
	var size = phrases.length;
	var rand = Math.floor(Math.random() * size);

	return phrases[rand];
}

