const socket = io()


let username;

do{
    username = prompt("enter your name: ")
}while(!username)

let messagearea = document.querySelector('.messages')
let input = document.querySelector('input')

function sendMessage(input){
    console.log('>>> input', input);
    if(input){
        let textmsg = {
            user : username,
            message: input
        }
        appendMessage(textmsg, 'sent')
        input.value = ""
        scrollToBottom()

        socket.emit('message', textmsg)
    }

}

document.querySelector('button').addEventListener('click', () => sendMessage(input.value))
input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

//appending msg on the browser
function appendMessage(textmsg, type){
    const chat = document.createElement('div')
    let className = type
    chat.classList.add(className, 'text_message')
    let markup = `
    <h4>${textmsg.user}</h4>
    <div>
    <p>${textmsg.message}</p>
    </div>
    `
    chat.innerHTML = markup
    messagearea.appendChild(chat)
}

//receiving messages
socket.on('message', (textmsg) =>{
    appendMessage(textmsg, "received")
    scrollToBottom()
})

socket.on('connect',() =>{
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
        else {
            console.log('No Error');
        }
    });
});

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}
