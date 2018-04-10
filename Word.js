var Letter = require("./Letter.js");

var Word = function(word) {
	var lettersArray = [];
	for(var i = 0; i < word.length; i++) {
		var newLetter = new Letter(word.charAt(i));
		lettersArray.push(newLetter);
	}

	this.letterArray = lettersArray;
	
	this.displayString = function() {
		var stringRepresentation = "";
		for(var i = 0; i < this.letterArray.length; i++)
			stringRepresentation += this.letterArray[i].returnAlphabets();
		return stringRepresentation;
	};

	this.isLetterInString = function(guessedCharacter) {
		for(var i = 0; i < this.letterArray.length; i++)
			this.letterArray[i].checkingAlphabets(guessedCharacter);
	};
};

module.exports = Word;
