
const app = require('./controllers/routes');

const server = require('http').Server(app)
const socket = require('socket.io')( server );

const io = new(require('./controllers/router-sockets'))(socket);


io.initSocket();

server.listen(8080, function( ){
  console.log('Escuchando puerto http://localhost:8080');
})




