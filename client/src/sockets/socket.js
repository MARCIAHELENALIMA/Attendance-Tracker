const socketIO = require('socket.io');

const configureSocketIO = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Lidar com a recepção de mensagens do cliente
    socket.on('sendMessage', (message) => {
      console.log('Mensagem recebida:', message);

      // Enviar a mensagem para todos os clientes conectados
      io.emit('message', message);
    });

    // Lidar com a desconexão do cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};

module.exports = configureSocketIO;