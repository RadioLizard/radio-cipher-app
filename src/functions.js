import {substitutionCipher,substitutionObject} from './cipherTypes/substitution'
import {caesarShift, caesarObject} from './cipherTypes/caesar'
import {vigenere, vigenereObject} from './cipherTypes/vigenere'
import {atbashCipher, atbashObject} from './cipherTypes/atbash'
import {getFilters} from './filters'

let filters = getFilters()
let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

//sets list of items to skip over in mapping messages
const skippableCharacters = [' ', "'", '?', '!', '-', '.', ',', ';', '"' ]

//code for fetching new alphabet
//output > a string alphabet based on the selections made on the html page
let getAlphabet = () => {
    let ogAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let newAlphabet = ogAlphabet.map((letter) => {
        let thisLetter = document.querySelector(`#${letter}Is`).value
        return thisLetter
    })
    return newAlphabet
}

//turning a string of letters into an array of numbers
//Arguments > string
//Output > an array of numbers
let indexify = (input) => {
    let array = input.split('')
    let indexedInput = array.map((item) => {
        if (skippableCharacters.includes(item)){
            return item
        }
        else{
            let itemIndex = alphabet.findIndex((letter) => letter===item)
            itemIndex += 1
            return itemIndex
         }
    })
    return indexedInput
}

//turning arrays of numbers into a string of letters
//arguments > array(of numbers)
//output > a string (of letters)
let unindexify = (arrayOfNumbers) => {
    let solution = arrayOfNumbers.map((item) => {
        if (skippableCharacters.includes(item)){
            return item
        }
        else{
            let newLetter = alphabet[item-1]
            return newLetter
        }
    })
    solution = solution.join('')
    return solution
}

//Defines the message for all ciphers
let wordIn = ''
let theMessage = document.querySelector('#message')
theMessage.addEventListener('input', (e) => {
    wordIn = e.target.value
    wordIn = wordIn.trim().toLowerCase()
})
 
//Defines the number for caesar-shift ciphers
const numberGen = () => {
let getNumber = document.querySelector('#caesar-number').value
const shiftNum = parseInt(getNumber)
return shiftNum
} 

//Defines the keyword for vigenere ciphers
let keywordIn = ''
let theKeyword = document.querySelector('#keyword')
theKeyword.addEventListener('input', (e) => {
    keywordIn = e.target.value
    keywordIn = keywordIn.trim().toLowerCase()
})

//function for checking message and keyword for unsupported characters
const doesContain = (word) => {
    const illegalChar = ['1', '2', '3', '4', '5', '6','7', '8', '9', '0', '@', '#','$', '%', '^', '&', '*', '(',')',
     "'", '_', '=', '+', '[',']', '{', '}', '|', '/', ':','>', '<', '\\', '\n']
     let containsIllegal = false
    illegalChar.forEach((symbol) => {
        if (word.includes(symbol)){
            containsIllegal = true
        }
    })
    return containsIllegal
}

//function for checking keys for anything besides letters
const keyDoesContain = (word) => {
    const illegalChar = ['1', '2', '3', '4', '5', '6','7', '8', '9', '0', '@', '#','$', '%', '^', '&', '*', '(',')',
     "'", '_', '=', '+', '[',']', '{', '}', '|', '/', ':','>', '<', '\\', '.', ',', '!','?', "'", '"', ':', 
     ';', '-', '\n',]
     let containsIllegal = false
    illegalChar.forEach((symbol) => {
        if (word.includes(symbol)){
            containsIllegal = true
        }
    })
    return containsIllegal
}
//The final solver function which returns a template string based on the results.
//output > the result of the cipher (as a string)
const solver = () => {
    let result = ''
    let shiftNum = numberGen()
    if (wordIn.length > 0 && !doesContain(wordIn)){
        if (filters.cipherType === "caesar-shift" ){
            caesarShift(wordIn, shiftNum)
            result = caesarObject.cipher
        }
        else if (filters.cipherType === "vigenere"){
            if(keywordIn.includes(' ')){
                alert('Please remove the space(s) from your key.')
            }
            if(keyDoesContain(keywordIn)){
                alert('Only letters are permitted in keys!')
            }
            else if (keywordIn.length < 1){
                alert('Please enter a keyword...')
            }
            else if (keywordIn.length > 0 && !keyDoesContain(keywordIn)){
                vigenere(wordIn, keywordIn)
                result=vigenereObject.cipher
           }
        }
        else if (filters.cipherType === "substitution"){
            let alphabetNew = getAlphabet()
            substitutionCipher(wordIn, alphabetNew)
            result=substitutionObject.cipher
        }
        else if (filters.cipherType==='atbash'){
            let alphabetNew = 'zyxwvutsrqponmlkjihgfedcba'
            atbashCipher(wordIn, alphabetNew)
            result=atbashObject.cipher
        }
        else{
            console.log('something went wrong Jim...')
        }
        return result
    }
    else if(wordIn.length < 1 ){
        alert('Please enter a message')
    }
    else if(doesContain(wordIn)){
        alert('Cannot solve with numbers or unaccepted special characters! Only [ . ], [ , ], [ ? ], [ ! ], [ " ], [ - ], [ ; ] are accepted! Please change your query and try again.')
    }
}

//Uses previously established variables to set the notes string for use in the views.js file
//output > notes string based on the filters
const setNotes = () => {
    let notes = ''
    if (filters.cipherType === "caesar-shift"){
        notes = caesarObject.notes
    }
    if (filters.cipherType === "vigenere"){
        notes = vigenereObject.notes
    }
    if (filters.cipherType === "substitution"){
        notes = substitutionObject.notes
    }
    if(filters.cipherType === 'atbash'){
        notes = atbashObject.notes
    }
    return notes
}

export { solver, setNotes, indexify, unindexify}
