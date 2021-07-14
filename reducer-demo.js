class Letter {

    constructor(char) {
        // Stores two pieces of info:
        //   1) The provided character string.
        //   2) A boolean indicating whether or not the character should be visible.
        this.char = char;
        // Here we use a regular expression and the match method to make the comparison. See the note below this class for more info.
        this.visible = !char.match(/[A-Za-z0-9]/);
    }

    guess(userChar) {
        // First compares the provided character to the stored character.
        const charCompare = (userChar === this.char);
        if (charCompare) {
            // If they match then it sets the visible indicator of the letter to true.
            this.visible = true;
        }
        // Return the result of the comparison. If they match true, if they don't false.
        return charCompare
    }

}

// ------------------------------------------------------------------------------------------------------------------------------------
// Notes on regular expressions.
// When you use a regular expression which is just a pattern surrounded by / / in conjuction with the match method for strings then you will get a
// boolean which returns an array if the string matches the expression and null otherwise. More info at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

// For this demo a few examples should show what is happening. 

console.log("\n Regular Expression Examples \n")
console.log("a".match(/[a-z]/))
console.log("a".match(/[A-Z]/))

console.log("") // This console log is just here to help format the output with a line break.

// Whats important here is that javascript views the first one as truthy and the second one as falsy.
function truthyOrFalsy (thing) {
    if (thing) {
        return 'This value is truthy'
    } else {
        return 'This value is falsy'
    }
}

console.log( truthyOrFalsy("a".match(/[a-z]/)) )
console.log( truthyOrFalsy("a".match(/[A-Z]/)) )

console.log("") // Another console log purely for formatting the output.

// So finally for the regular expression used in the this.visible attribute of the class we get the following.
console.log(` "a".match(/[A-Za-z0-9]/) gives us: ${truthyOrFalsy("a".match(/[A-Za-z0-9]/))}`)
console.log(` "B".match(/[A-Za-z0-9]/) gives us: ${truthyOrFalsy("B".match(/[A-Za-z0-9]/))}`)
console.log(` "8".match(/[A-Za-z0-9]/) gives us: ${truthyOrFalsy("8".match(/[A-Za-z0-9]/))}`)
console.log(` "?".match(/[A-Za-z0-9]/) gives us: ${truthyOrFalsy("?".match(/[A-Za-z0-9]/))}`)
console.log(` "<".match(/[A-Za-z0-9]/) gives us: ${truthyOrFalsy("<".match(/[A-Za-z0-9]/))}`)

// ------------------------------------------------------------------------------------------------------------------------------

class Word {

    constructor(word) {
        // Run the code an check the console logs for an example of what is happening here.
        this.letters = word.split('').map( char => new Letter(char) )
    }

    // The root of this write up. This is the reducer full explanation below but short version, this will execute letter.guess(char)
    // for every letter in the array 'this.letters' and will return true if one of the letter.guess calls returns true and false only
    // when every letter.guess call returns false.

    guessLetter(char) {
        const inWord = this.letters.reduce( (accumulator, letter) => {
            return accumulator || letter.guess(char);
        }, false)
        return inWord
    }
}

// --------------------------------------------------------------------------------------------------------------------------------
// Notes on reducer methed
// The reducer method has 3 parts:
//   1) The array that called the method. In guessLetter() the array calling reduce is 'this.letters'
//   2) A callback function which takes two arguments. The first is the accumulator and the second is an element of the array.
//      In guess.letter this is the arrow function (accumulator, letter) => {return accumulator || letter.guess(char)}.
//   3) An initial value for the accumulator. In guess.letter this is the false after the callback function.

// How the reducer works is that it calls the callback function with the initial value of the accumulator and the first element of the array.
// The callback function returns a value which is stored in the accumulator, then the callback function is called again with the new accumulator
// value and the next element in the array. This continues until you reach the end at which point it returns the final accumulator value.
// So in guessLetter we are starting false, then using the OR operator with letter.guess(char) so if letter.guess(char) is true then the OR is true
// and so true is stored in the accumlator remaining true until the end since true OR anything is true. The only way to stay false is if every
// letter.guess(char) is false.


// Okay that is a lot of words but some examples should help. For this I will add a method to the Word class that is the same as guessLetter but with some helpful console logs.
Word.prototype.guessLetterDetailed = function(char) {
    const inWord = this.letters.reduce( (accumulator, letter) => {
        console.log(`\naccumlator is currently: ${accumulator}`)
        console.log(`the current element is: ${letter.char}`)
        if (letter.guess(char)) {
            console.log('The letters match!')
        } else {
            console.log('No match.')
        }
        return accumulator || letter.guess(char);
    }, false)
    return inWord
}

// Now we can create a new word and guess a letter to see the reducer in action.
const example = new Word("javascript")

console.log(example.letters)

example.guessLetterDetailed("s")


// Finally some examples to illustrate how the constructor in the Word class is working
// Lets start with a string and execute each of the methods in order to see what they give us.
console.log("\n Word class constructor examples \n")

// This first step splits the string into an array where each index corresponds to a letter.
console.log("javascript".split(''))

// This step creates a new array where each string version of a letter is 1 to 1 mapped to a letter class version of that letter.
console.log("javascript".split('').map( char => new Letter(char) ));
