//se conecta al servidor de Socket.IO
const socket = io()
//Obtiene los elementos del DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//cuando el usuario hace clic en "Enviar"
btn.addEventListener('click', function () {
    // Emite un evento al servidor con el nombre del usuario y su mensaje
    socket.emit('chat:message', {
        message : message.value,
        username: username.value
    });
});

// cuando el usuario empieza a escribir en el campo de mensaje
message.addEventListener('keypress', function () {
    console.log(username.value);
    // Emitieun evento al servidor indicando que está escribiendo
    socket.emit('chat:typing', username.value);
})

// escucha cuando el servidor emite un nuevo mensaje
socket.on('chat:message', function (data) {
    actions.innerHTML = ''; // limpia el mensaje de "escribiendo"
    //Agrega el nuevo mensaje al chat
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

//escucha cuando el servidor indica que alguien está escribiendo
socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} esta escribiendo un mensaje.</em></p>` //muestra un texto indicando que el usuario está escribiendo
});