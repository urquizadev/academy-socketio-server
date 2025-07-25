const path = require('path'); //variable para manejar rutas del sistema de archivos
const express = require('express'); //framework exprees
const app = express(); //instancia de la app

//Configuracion del puerto
app.set('port', process.env.PORT || 3000)

//uso de archivos de la carpeta public
console.log()
app.use(express.static(path.join(__dirname, 'public'))); //caragara el index.html automaticamente


//inicia el servidor
const server = app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en: http://localhost:${app.get('port')}`);
});

//websockets
const SocketIO= require('socket.io'); //Importamos la librería de Socket.IO
const io = SocketIO(server); //Asociamos Socket.IO con el servidor


//escucha conexiones de usuarios que se conectan al servidor
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {  //Escucha el evento 'chat:message' desde el cliente
        io.sockets.emit('chat:message', data);  // Reenviamos ese mensaje a todos los clientes conectados
    })

    //Escucha el evento 'chat:typing' desde el cliente
    socket.on('chat:typing', (data) => { 
        socket.broadcast.emit('chat:typing', data);  // Reenviamos ese estado de "escribiendo" a todos menos al que lo generó
    })
});



