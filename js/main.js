var defaultColor = '#ff6600';
var selectColor = '#ffffff';
var text;
var next = null;
var words, wordNames, audio;
var moving = false;

var wordSpacing = 25;
var width = 1024;
var height = 700;
var rightKey;
var sounds = [];

var currentWordIndex, currentPhrase;

var game;

$(window).resize(function() {
	
	width = this.innerWidth;
	height = this.innerHeight;

	console.log("width " + width + " height "+ height);

	game.width = window.innerWidth;
	game.height = window.innerHeight;

	game.renderer.resize(width, height);
 game.world.height = height;
 console.log("centerY" + game.world.centerY);

// forceRedraw();
newWord(true);
 
});

$(document).ready(function() {
	width = window.innerWidth;
	height = window.innerHeight;

	console.log("width " + width + " height "+ height);

	game = new Phaser.Game(width, height, Phaser.AUTO, '', { 
		preload: preload, 
		create: create,
		update: update 
	});
 
});

function preload() {

    game.load.image('home', 'images/home.png');
    game.load.image('next', 'images/right-arrow.png');
    game.load.image('play', 'images/music.png');
}
   
function create() {
	//words = game.add.group();
	words= [];

	//game.stage.backgroundColor = '#182d3b';
	game.stage.backgroundColor = 'rgb(200,200,200)';
	// What does this do?
	//game.input.touch.preventDefault = false;

    buildMenuRegion(this);
    buildPhrase();

    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}
 
function update() {
	if (rightKey.isDown) {
		newWord(false);
	}
}

function buildMenuRegion() {
	var rightBuffer = 10;
	var iconSize = 46;
	var i = 3;
	home = game.add.sprite(game.world.width - ((iconSize * i--) + rightBuffer), 0, 'home');
	home.inputEnabled = true;
 	home.events.onInputDown.add(goHome,this);

 	play = game.add.sprite(game.world.width - ((iconSize * i--) + rightBuffer), 0, 'play');
 	play.inputEnabled = true;
 	play.events.onInputDown.add(playPhrase,this);

 	next = game.add.sprite(game.world.width - ((iconSize * i--) + rightBuffer), 0, 'next');
 	next.inputEnabled = true;
 	next.events.onInputDown.add(newWord,this);

}
function goHome() {
	console.log("home was clicked");
}

function buildPhrase(wd) {
	var w;
	
	words = []
	wordNames = [];
	
	var newWord,totalWidth;
	if (wd === true) {
		newWord = currentPhrase;
		w = newWord.split(" ");
	}
	else {
		disposeAudio();
		newWord = getPhrase();
		w = newWord.split(" ");
		loadAudioForWord(w);
	}

	var xPos = 20;
	for (var i =0; i< w.length; i++) {
		
		text = game.add.text(xPos,game.world.centerY,w[i]);
		
		text.framename = i;
	 	text.inputEnabled = true;
    	text.events.onInputDown.add(wordClicked, this);
    	
    	text.font = 'Helvetica';
    	text.fontWeight = 'bold';
    	text.fontSize = 90;

	 	text.stroke = '#ffffff';
    	text.strokeThickness = 2;

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
	// Unselect current word
	unselectCurrentWord();

	// Highlight selected one
	words[word.framename].fill = selectColor;
	currentWordIndex = word.framename;
	
}

function unselectCurrentWord() {
	if (currentWordIndex != undefined) {
		words[currentWordIndex].fill = defaultColor;
	}
}

function selectAll() {
	for (var i = 0; i < words.length; i++) {
		words[i].fill = selectColor;
	}
}

function newWord(wd) {
	console.log("wd is " + wd);
	if (!moving) {
		unselectCurrentWord();
		clearScreen(wd);	
		moving = true;
	}
}

function clearScreen(wd) {
	var done = false;
	var tween, word, spd;
	
	if (wd === true) spd = 1;
	else spd = 1000;

	for (var i = 0; i < words.length; i++) {
		word = words[i];

		tween = game.add.tween(word);
	    tween.to({x:3000, y:game.world.centerY},spd).start()
		.onComplete.addOnce(function() {
    		// only do once
    		if (!done) {    			
    			buildPhrase(wd);
    			done = true;
    			moving = false;
    		}
    	});
	}
}

function getPhrase() {
	var size = phrases.length;
	var rand = Math.floor(Math.random() * size);

	var w = phrases[rand];

	if (!currentPhrase) {
		currentPhrase = w;
		return w;
		//return "Orange banana apple";
	}
	else {
		while (w == currentPhrase) {
			rand = Math.floor(Math.random() * size);
			w = phrases[rand];
		}
		currentPhrase = w;
		return w;
	}
}

