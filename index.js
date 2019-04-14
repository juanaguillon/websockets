// const express = require('express');
// const app = express();
// const server = require("http").Server(app);

// const io = require('socket.io')(server)

// var messages = [
//   {
//     id: 1,
//     text: 'Hola soy Camili',
//     auth: 'Ag.'
//   }
// ]

// app.use(express.static('public'));

// app.get('/hola',function(req, res ){
//   res.send('Hola');
// })

// io.on('connection',function(socket){
//   socket.emit('messages', messages )

//   socket.on('newmessage', (message) => {
//     messages.push( message );
//     io.sockets.emit("messages",messages);

//   })
// })


// server.listen( 8120, function( ){
//   console.log('Funcionando en: https://localhost:8120' );
// })

const app = require('./controllers/routes');

const server = require('http').Server(app)
const socket = require('socket.io')( server );





server.listen(8080, function( ){
  console.log('Escuchando puerto http://localhost:8080');
})




