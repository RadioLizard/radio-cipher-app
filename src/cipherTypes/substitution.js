import {getFilters} from '../filters'

let filters=getFilters()

//sets starting alphabet
let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

//sets list of items to skip over in mapping messages
const skippableCharacters = [' ', "'", '?', '!', '-', '.', ',', ';', '"' ]

//the core substitution function for the substitution cipher
//arguments > 1. the message (a string) 2. the new alphabet(an array of letters)
//output > the solved substitution cipher (as an array of letters)
const subbing = (message, newAlphabet) => {
    let indexedInput = []
    message.forEach((item) => {
        if(skippableCharacters.includes(item)){
            indexedInput.push(item)
        }
        else{
            let itemIndex = alphabet.findIndex((letter) => letter===item)
            indexedInput.push(itemIndex)
         }
    })
    let finalOutcome=[]
    indexedInput.forEach((item) => {
        if(skippableCharacters.includes(item)){
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
    const encodedIndex = subbing(newInput, newAlphabet)
    newAlphabet = newAlphabet.join('')
    const result = encodedIndex.join('')
    substitutionObject.cipher=result
    substitutionObject.notes = `${filters.eOrD} ${input} using the substitution method and and the following alphabet: ${newAlphabet}. `
}

let substitutionObject = {
    cipher: '',
    notes: '',
}

export {subbing, substitutionCipher, substitutionObject}