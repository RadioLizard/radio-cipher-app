import {getFilters} from '../filters'
import {indexify, unindexify} from '../functions'

let filters = getFilters()

//sets list of items to skip over in mapping messages
const skippableCharacters = [' ', "'", '?', '!', '-', '.', ',', ';', '"' ]

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
        if(skippableCharacters.includes(number)){
        result.push(number)
        }
        else{
            if(filters.eOrD === 'decoded'){
                newNumber = number + (key[keyNumber]*-1)+1
            }
            else if (filters.eOrD === "encoded"){
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
    vigenereObject.cipher = finalResult
    vigenereObject.notes = `${filters.eOrD} ${input} using the Vigen\xE8re method and '${key}' as the keyword. `
}

let vigenereObject = {
    cipher: '',
    notes: ''
}

export {vigenere, vigenereObject}