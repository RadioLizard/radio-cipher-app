import {getFilters} from '../filters'
import {subbing} from './substitution'

let filters=getFilters()

let atbashCipher = (input, newAlphabet) => {
    let newInput = input.split('')
    const alpha2array = newAlphabet.split('')
    const encodedIndex = subbing(newInput, alpha2array)
    const result = encodedIndex.join('')
    atbashObject.cipher=result
    atbashObject.notes = `${filters.eOrD} ${input} using the atbash method. `
}

let atbashObject = {
    cipher: '',
    notes: ''
}

export {atbashCipher, atbashObject}