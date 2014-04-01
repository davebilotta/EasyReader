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

var game = new Phaser.Game(width, height, Phaser.AUTO, '', { 
	preload: preload, 
	create: create,
	update: update 
});
 
function preload() {

    game.load.image('arrow', 'images/arrow.png');
    game.load.image('play', 'images/play.png');
    game.load.image('buttons', 'images/misctransparent.png');

    //game.load.audio('jump','audio/words/jump.mp3');
    //game.load.audio('over','audio/words/over.mp3');
    //game.load.audio('pancake','audio/words/pancake.mp3');

}

function create() {
	//words = game.add.group();
	words= [];

//game.add.audio('jump');
//game.add.audio('over');
//game.add.audio('pancake');

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
	unselectCurrentWord();
	// Unselect current word


	// Highlight selected one
	words[word.framename].fill = selectColor;
}

function newWord() {

	if (!moving) {
		unselectCurrentWord();
		//playPhrase();
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

function unselectCurrentWord() {
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

function getPhrase() {
	var size = phrases.length;
	var rand = Math.floor(Math.random() * size);

	//return phrases[rand];
	// temporarily hard code to "Jump over pancake""; (index 1 in array)
	return phrases[0];
}

