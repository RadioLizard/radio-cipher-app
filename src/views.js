 //////////////////////////////
//////~*SETUP SECTION*~////////
///////////////////////////// 

import { getFilters } from './filters'
import { solver, setNotes } from './functions'
import { addMessage } from './messages'

let filters=getFilters()

const caesarParameters = document.querySelector('#caesar-parameters')
const vigenereParameters = document.querySelector('#vigenere-parameters')
const substitutionParameters = document.querySelector('#substitution-parameters')
const caesarsQuestion = document.querySelector('#caesar-question')

 //////////////////////////////
/////~*FUNCTIONS SECTION*~/////
///////////////////////////// 

//displays the correct parameters for the selected type of cipher
const displaySolverDOM = () => {
    if(filters.cipherType === 'caesar-shift'){
        caesarParameters.style = "display: block"
        vigenereParameters.style = "display: none"
        substitutionParameters.style = "display: none"
        if(filters.eOrD === 'decoded'){
            caesarsQuestion.textContent = "How many letters should each letter shift backward?"
        }
        else if(filters.eOrD === 'encoded'){
            caesarsQuestion.textContent = "How many letters should each letter shift forward?"
        }
    }
    else if(filters.cipherType === 'vigenere'){
        vigenereParameters.style = "display: block"
        caesarParameters.style = 'display: none'
        substitutionParameters.style = 'display: none'
    }
    else if(filters.cipherType === 'substitution'){
        substitutionParameters.style = 'display: block'
        vigenereParameters.style = 'display: none'
        caesarParameters.style = 'display: none'
    }
    else if(filters.cipherType === 'atbash'){
        substitutionParameters.style = 'display: none'
        vigenereParameters.style = 'display: none'
        caesarParameters.style = 'display: none'
    }
}

//Displays the result and adds the log of what was done to the page. 
const generateSolvedDOM = () => {
    let answer = solver()

    //prevents the DOM from generating if there is no result from solver()
    if (answer === undefined || answer === ''){
        return
    }
    else{
        //generates just the result of the query
        let resultHolder = document.querySelector('#result')
        resultHolder.textContent = ''
        resultHolder.textContent = `${answer}`

        //generates the message and tacks it onto the message array/saved in local storage
        let notes = setNotes()
        let message = '-' + notes +  'Result: ' + answer
        addMessage(message)
    }
}

export {displaySolverDOM, generateSolvedDOM}
