 //////////////////////////////
///////~*SETUP SECTION*~/////// 
///////////////////////////// 

import {getFilters} from './filters'

let filters = getFilters()
let alphabet = 'abcdefghijklmnopqrstuvwxyz'
alphabet = alphabet.split('')

//turning a string of letters into an array of numbers
//Arguments > string
//Output > an array of numbers
let indexify = (input) => {
    let array = input.split('')
    let indexedInput = []
    array.forEach((item) => {
        if (item === ' ' || item === "'" || item === '?' || item === '!' || item === '-' || item === '.' || item === ',' || item === ';' || item === '"'){
            indexedInput.push(item)
        }
        else{
            let itemIndex = alphabet.findIndex((letter) => letter===item)
            itemIndex += 1
            indexedInput.push(itemIndex)
         }
    })
return indexedInput
}

//turning arrays of numbers into a string of letters
//arguments > array(of numbers)
//output > a string (of letters)
let unindexify = (arrayOfNumbers) => {
    let solution = []
    arrayOfNumbers.forEach((item) => {
        if (item === ' ' || item === "'" || item === '?' || item === '!' || item === '-' || item === '.' || item === ',' || item === ';' || item === '"'){
            solution.push(item)
        }
        else{
            let newLetter = alphabet[item-1]
            solution.push(newLetter)
        }
    })
    solution = solution.join('')
    return solution
}

 //////////////////////////////
/// ~*SUBSTITUTION SECTION*~/// 
///////////////////////////// 

//code for fetching new alphabet
//output > a string alphabet based on the selections made on the html page
let getAlphabet = () => {
    let ogAlphabet = 'abcdefghijklmnopqrstuvwxyz'
    ogAlphabet = ogAlphabet.split('')
    let newAlphabet = ''
    ogAlphabet.forEach((letter) => {
        let thisLetter = document.querySelector(`#${letter}Is`).value
        newAlphabet += thisLetter
    })
    return newAlphabet
}

//the core substitution function for the substitution cipher
//arguments > 1. the message (a string) 2. the new alphabet(an array of letters)
//output > the solved substitution cipher (as an array of letters)
const subbing = (message, newAlphabet) => {
    let indexedInput = []
    message.forEach((item) => {
        if (item === ' ' || item === "'" || item === '?' || item === '!' || item === '-' || item === '.' || item === ',' || item === ';' || item === '"'){
            indexedInput.push(item)
        }
        else{
            let itemIndex = alphabet.findIndex((letter) => letter===item)
            indexedInput.push(itemIndex)
         }
    })
    let finalOutcome=[]
    indexedInput.forEach((item) => {
        if(item === ' ' || item === "'" || item === '?' || item === '!' || item === '-' || item === '.' || item === ',' || item === ';' || item === '"'){
            finalOutcome.push(item)
        }
        else {
            let letter= newAlphabet[item]
            finalOutcome.push(letter)
            }
        })
    return finalOutcome
}

//the final, simplified substitution decoding function
//arguments > 1. the message (a string) 2. the new alphabet(a string, preferrably from getAlphabet above)
//output > the message decoded or encoded using the new alphabet (as a string)
let substitutionCipher = (input, newAlphabet) => {
    let newInput = input.split('')
    const alpha2array = newAlphabet.split('')
    const encodedIndex = subbing(newInput, alpha2array)
    const result = encodedIndex.join('')
    return result
}

 //////////////////////////////
/// ~*CAESAR SHIFT SECTION*~/// 
///////////////////////////// 

//the core shifting function for the caesar shift encoder
//arguments > 1. an array of numbers representing the message (the message is indexified in caesarShiftEncoding()) 2. the amount to shift each letter by (a number)
//output > an array of numbers representing the original array after it's been shifted
let shifting = (array, shiftNumber) => {
    let result = []
    array.forEach((item) => {
        let newItem = item
        if(item === ' ' || item === "'" || item === '?' || item === '!' || item === '-' || item === '.' || item === ',' || item === ';' || item === '"'){
            result.push(' ')
        }
        else{
            if(filters.eOrD === 'encoder'){
                newItem = item + shiftNumber
            }
            else if (filters.eOrD === 'decoder'){
                newItem = item + (shiftNumber * -1)
            }
            if (newItem > 26){
                newItem = newItem -26
                result.push(newItem)
            }
            else if (newItem < 1){
                newItem = newItem +26
                result.push(newItem)
            }
            else if(newItem > 0 && newItem < 27){
                result.push(newItem)
            }
        }
    })
    return result
}

//the final, simplified caesar shift decoding function
//arguments > 1. the encoded or decoded message (a string) 2. (the number to shift the letters by either forward or backward, depending (a number))
//output > the shifted message (a string of letters)
let caesarShift = (message, shiftNumber) => {
    let startingValues = indexify(message)
    let shiftedValues = shifting(startingValues, shiftNumber)
    let finalResult = unindexify(shiftedValues)
    return finalResult
}

 //////////////////////////////
//~*VIGENERE CIPHER SECTION*~//
///////////////////////////// 

//setting the expanded key for the vigenere cipher
//arguments > 1. the message (an array of numbers) 2. the codeword (as an array of numbers)(both are indexified in the core vigenere function)
//output > an array of numbers that repeats itself until it is at least as long as the encoded(or decoded) message
let vigenereKeyLengthen = (input, codeword) => {
    let lengthen = (codeword) => {
        if (codeword.length < input.length){
            codeword.forEach((item) => {
                codeword.push(item)
                })
            lengthen(codeword)
        }
    }
    lengthen(codeword)
    return codeword
}

//the core vigenere shifting decoding function
//arguments > 1. the message (as an array of numbers)  the key (lengthened by the vigenereKeyLengthen function in the main vignere function)
//output > the altered message based on the key (as an array of numbers)
let squaring = (input, key) => {
    let keyNumber = 0
    let result = []
    input.forEach((number) => {
        let newNumber = number
        if(number === ' ' || number === "'"|| number === '?' || number === '!' || number === '-' || number === '.' || number === ',' || number === ';' || number === '"'){
            result.push(number)
        }
        else{
            if(filters.eOrD === 'decoder'){
                newNumber = number + (key[keyNumber]*-1)+1
            }
            else if (filters.eOrD === "encoder"){
                newNumber = number + (key[keyNumber])-1
            }
            if(newNumber > 26){
                newNumber = newNumber - 26
                result.push(newNumber)
                keyNumber ++
            }
            else if (newNumber < 1){
                newNumber = newNumber + 26
                result.push(newNumber)
                keyNumber ++
            }
            else if (newNumber > 0 && newNumber < 27){
                result.push(newNumber)
                keyNumber ++
            }
        }
    })
    return result
}

//the final, simplified vigenere encoding function
//arguments > 1. the message (a string of letters) 2. the key (a string of letters)
//output > a string of letters (encoded or decoded, depending) by the key
let vigenere = (input, key) => {
    let codewordValues = indexify(key)
    let startingValues = indexify(input)
    let newCodeWord = vigenereKeyLengthen(startingValues, codewordValues)
    let squaredValues = squaring(startingValues, newCodeWord)
    let finalResult = unindexify(squaredValues)
    return finalResult
}

 //////////////////////////////
//~*PROBLEM SOLVER SECTION*~///
///////////////////////////// 

//Defines the message for all ciphers
let wordIn = ''
let theMessage = document.querySelector('#message')
theMessage.addEventListener('input', (e) => {
    wordIn = e.target.value
    wordIn = wordIn.trim().blinktoLowerCase()
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
     ';', '-', '\n']
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
            result = caesarShift(wordIn, shiftNum)
        }
        else if (filters.cipherType === "vigenere"){
            if(keywordIn.includes(' ')){
                alert('Please remove the space(s) from your key.')
            }
            if(keyDoesContain(keywordIn)){
                alert('Only letters are permitted in keys!')
            }
            else if (keywordIn.length > 0 && !keyDoesContain(keywordIn)){
                result = vigenere(wordIn, keywordIn)
            }
            else if (keywordIn.length < 1){
                alert('Please enter a keyword...')
            }
            else if (doesContain(keywordIn)){
                alert('Cannot solve with numbers or unaccepted special characters! Only [ . ], [ , ], [ ? ], [ ! ], [ " ], [ \' ],[ - ], [ ; ] are accepted! Please change your query and try again.')
            }
        }
        else if (filters.cipherType === "substitution"){
            let alphabetNew = getAlphabet()
            result = substitutionCipher(wordIn, alphabetNew)
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
    let shiftNum = numberGen()
    if (filters.cipherType === "caesar-shift" && filters.eOrD === "encoder"){
        notes = `Encoded ${wordIn} using the Caesar shift method [shifting each letter ${shiftNum} forward]. `
    }
    if (filters.cipherType === "caesar-shift" && filters.eOrD === "decoder"){
        notes = `Decoded ${wordIn} using the Caesar shift method [shifting each letter ${shiftNum} backward]. `
    }
    if (filters.cipherType === "vigenere" && filters.eOrD === "encoder"){
        notes = `Encoded ${wordIn} using the Vigen\xE8re method and the keyword ${keywordIn}. `
    }
    if (filters.cipherType === "vigenere" && filters.eOrD === "decoder"){
        notes = `Decoded ${wordIn} using the Vigen\xE8re method and the keyword ${keywordIn}. `
    }
    if (filters.cipherType === "substitution" && filters.eOrD === "encoder"){
        let alphabetString = getAlphabet()
        notes = `Encoded ${wordIn} using the substitution method with this alphabet: ${alphabetString}. `
    }
    if (filters.cipherType === "substitution" && filters.eOrD === "decoder"){
        let alphabetString = getAlphabet()
        notes = `Decoded ${wordIn} using the substitution method with this alphabet: ${alphabetString}. `
    }
    // theMessage.value = ''
    // wordIn = ''
    return notes
}
export { solver, setNotes}
