
import {getFilters} from './filters'
import {displaySolverDOM, generateSolvedDOM } from './views'
import { clearMessages, loadMessages, getMessages, renderMessages } from './messages';
let messages = getMessages()
let filters = getFilters()

loadMessages()
renderMessages()
displaySolverDOM()

document.querySelector('#cipher-type').addEventListener('change', (e) => {
    filters.cipherType = e.target.value
    displaySolverDOM()
})
document.querySelector('#e-or-d').addEventListener('change', (e) => {
    filters.eOrD = e.target.value
    displaySolverDOM()
})

document.querySelector('#solve').addEventListener('click', (e) => {
    generateSolvedDOM()
})

document.querySelector('#clear').addEventListener('click', (e) => {
    clearMessages()
})