var Letter = require("./Letter.js");
var Word = require("./Word.js");
var inquirer = require("inquirer");
const randomWord = require("random-word");
//This will give me a random word from dictionary 
var wordBank = randomWord();


var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 
"s", "t", "u", "v", "w", "x", "y", "z"];

var guessedLetters = [];
var incorrectLetters = [];
//this will generate random guess number to make the game harder.
var remainingGuess = Math.floor(Math.random() * (11 - 5 + 1)) + 5;
var gamesPlayed = 0;
var selectedWord;
var lettersArray = [];

function startGame() {

	inquirer.prompt([
	{
		type: "confirm",
		message: "Would you like to play Hangman?",
		name: "play",
		default: true
	}
	]).then(function(response){
		if(response.play === true) {
			console.log("");
			playGame();
		}
	});
}

function playGame() {
	selectedWord = new Word(wordBank);

	for(var i = 0; i < selectedWord.letterArray.length; i++) {
		var letter = selectedWord.letterArray[i].value;
		lettersArray.push(letter.toLowerCase());
		if(alphabet.indexOf(letter.toLowerCase()) === -1)
			selectedWord.letterArray[i].show = true;
	}

	if(gamesPlayed === 0) {
		console.log("Guess this word:");
		console.log("");
	}
	
	console.log(selectedWord.displayString());
	console.log("");
	playRound();
}

function playRound() {

	inquirer.prompt([
	{
		name: "playerGuess",
		message: "Guess a letter!"
	}
	]).then(function(response){
		var input = response.playerGuess;
		if(checkValidInput(input) === false) {
			console.log("");
			console.log("You have already guessed that letter!");
			console.log("");
			playRound();
		}
		else {
			guessedLetters.push(input);

			if(lettersArray.indexOf(input) === -1) {
				remainingGuess--;
				incorrectLetters.push(input);
				console.log("");
				console.log(selectedWord.displayString());
				console.log("");
				console.log("\x1b[31m%s\x1b[0m", "INCORRECT!");
				console.log("");
				if(remainingGuess > 0) {
					console.log("Guesses remaining: " + remainingGuess);
					console.log("");
					console.log("Incorrect letters guessed: " + JSON.stringify(incorrectLetters));
					console.log("");
				}
			}
			else {
				selectedWord.isLetterInString(input);
				selectedWord.isLetterInString(input.toUpperCase());
				console.log("");
				console.log(selectedWord.displayString());
				console.log("");
				console.log("\x1b[32m%s\x1b[0m", "CORRECT!");
				console.log("");
				if(selectedWord.displayString().indexOf("_") > -1) {
					console.log("Incorrect letters guessed: " + JSON.stringify(incorrectLetters));
					console.log("");
				}
			}

			if(remainingGuess === 0 || selectedWord.displayString().indexOf("_") === -1) {

				if(remainingGuess === 0) {
					console.log("\x1b[31m%s\x1b[0m", "YOU LOST THIS ROUND! HERE IS ANOTHER WORD FOR YOU...");
					console.log("");
				}
				else {
					console.log("\x1b[32m%s\x1b[0m", "YOU WON THIS ROUND! HERE IS ANOTHER WORD FOR YOU...");
					console.log("");
				}

				guessedLetters = [];
				incorrectLetters = [];
				remainingGuess = 9;
				lettersArray = [];
				gamesPlayed++;

				playGame();
			}
			else 
				playRound();
		} 
	});
}

function checkValidInput(input) {
	if(input.length === 0 || input.length > 1 || alphabet.indexOf(input) === -1 || guessedLetters.indexOf(input) > -1)
		return false;
	else 
		return true;
}

startGame();