let messages = []

//function for saving the log of messages on local storage
const saveMessages = () => {
    localStorage.setItem('messages', JSON.stringify(messages))
}

//function for loading the log of messages on local storage
//Read existing notes from local storage
let loadMessages = () => {
    let messagesJSON = localStorage.getItem('messages')
    
    try{
        messages = messagesJSON ? JSON.parse(messagesJSON) : []
    }
    catch(e){
        messages = []
    }
    return messages
 }

 //Renders the messages on the page
 const renderMessages = () => {
    let resultCollection = document.querySelector('#result-list')
    resultCollection.innerHTML = ''
    resultCollection.textContent = ''
    messages.forEach((message) => {
        const resultLogItem = document.createElement('div')
        resultLogItem.classList.add('line-please')
        let result = document.createElement('span')
        result.textContent = message
        resultLogItem.appendChild(result)
        resultCollection.appendChild(resultLogItem)
    })
 }

 //allows other JS files to have access to the array
 const getMessages = () => messages

 //adds new messages to the array, saves them to local storage and then displays them on the page
 const addMessage = (message) =>{
     messages.unshift(message)
     saveMessages()
     renderMessages()
 }

 //clears the messages, both from saved data and on the page
 const clearMessages = () =>{
     messages = []
     saveMessages()
     renderMessages()
 }

 export { loadMessages, renderMessages, getMessages, addMessage, clearMessages }