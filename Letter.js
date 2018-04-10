var Letter = function(value) {
	this.value = value;
	this.show = false;
	this.returnAlphabets = function() {
		if(this.show === false)
			return "_ ";
		else
			return value + " ";
	};
	this.checkingAlphabets = function(guessedCharacter) {
		if(guessedCharacter.toLowerCase() === this.value.toLowerCase())
			this.show = true;
	};
};

module.exports = Letter;