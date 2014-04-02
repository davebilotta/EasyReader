var defaultColor = '#ff6600';
var selectColor = '#ffffff';
var text;
var next = null;
var words, wordNames, audio;
var moving = false;

var wordSpacing = 25;
var width = 1024;
var height = 768;
var rightKey;
var sounds = [];

var currentWordIndex, currentPhrase;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { 
	preload: preload, 
	create: create,
	update: update 
});
 
function preload() {

    game.load.image('arrow', 'images/arrow.png');
    game.load.image('play', 'images/play.png');
    // home = |0, Next = |1, music = |4
    //game.load.spritesheet('buttons', 'images/misctransparent.png',58,5);

}
   
function create() {
	//words = game.add.group();
	words= [];

	game.stage.backgroundColor = '#182d3b';

    buildMenuRegion(this);
    buildPhrase();

    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}
 
function update() {
	if (rightKey.isDown) {
		newWord();
	}
}

function buildMenuRegion() {
	play = game.add.sprite(game.world.width - 120, 0, 'play');
 	play.inputEnabled = true;
 	play.events.onInputDown.add(playPhrase,this);

 	arrow = game.add.sprite(game.world.width - 70, 0, 'arrow');
 	arrow.inputEnabled = true;
 	arrow.events.onInputDown.add(newWord,this);
}

function buildPhrase() {
	
	disposeAudio();
	
	words = []
	wordNames = [];
	
	var totalWidth;
	var newWord = getPhrase();
	var w = newWord.split(" ");
	
	// TODO: Need to wait until assets are done loading
	loadAudioForWord(w);

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

function newWord() {
	if (!moving) {
		unselectCurrentWord();
		clearScreen();	
		moving = true;
	}
}

function clearScreen() {
	var done = false;
	var tween;
	var word;
	for (var i = 0; i < words.length; i++) {
		word = words[i];

		tween = game.add.tween(word);
	    tween.to({x:3000, y:game.world.centerY},1000).start()
		.onComplete.addOnce(function() {
    		// only do once
    		if (!done) {    			
    			buildPhrase();
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
	}
	else {
		while (w == currentPhrase) {
			rand = Math.floor(Math.random() * size);
			w = phrases[rand];
		}
		currentPhrase = w;
		return w;
	}
	
	//
	//return phrases[0];
}

