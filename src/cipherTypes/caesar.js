import {getFilters} from '../filters'
import {indexify, unindexify} from '../functions'

let filters=getFilters()

//sets list of items to skip over in mapping messages
const skippableCharacters = [' ', "'", '?', '!', '-', '.', ',', ';', '"' ]

//the core shifting function for the caesar shift encoder
//arguments > 1. an array of numbers representing the message (the message is indexified in caesarShiftEncoding()) 2. the amount to shift each letter by (a number)
//output > an array of numbers representing the original array after it's been shifted
let shifting = (array, shiftNumber) => {
    let result = []
    array.forEach((item) => {
        let newItem = item
        if(skippableCharacters.includes(item)){
        result.push(' ')
        }
        else{
            if(filters.eOrD === 'encoded'){
                newItem = item + shiftNumber
            }
            else if (filters.eOrD === 'decoded'){
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
    caesarObject.cipher = finalResult
    caesarObject.notes = `${filters.eOrD} ${message} using the Caesar shift method shifting each letter ${shiftNumber} ${filters.eOrD==='decoded' ? 'backwards' : 'forwards'}. `
}

let caesarObject = {
    cipher : '',
    notes : '',
}

export {caesarShift, caesarObject}