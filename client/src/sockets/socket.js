const socketIO = require('socket.io');

// Armazenar as informações dos clientes conectados
const connectedClients = [];

const configureSocketIO = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Armazenar informações do cliente conectado
    const clientInfo = {
      socketId: socket.id,
    };
    connectedClients.push(clientInfo);

    // Enviar a lista de usuários conectados para o novo cliente
    const userList = connectedClients.map((client) => ({
      id: client.socketId,
      isActive: client.socketId === socket.id,
    }));
    io.to(socket.id).emit('userList', userList);

    // Lidar com a recepção de mensagens do cliente
    socket.on('sendMessage', (message) => {
      console.log('Mensagem recebida:', message);

      // Enviar a mensagem para todos os clientes conectados
      io.emit('message', message);
    });

    // Lidar com a desconexão do cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');

      // Remover as informações do cliente desconectado
      const index = connectedClients.findIndex(
        (client) => client.socketId === socket.id
      );
      if (index !== -1) {
        connectedClients.splice(index, 1);
      }

      // Atualizar a lista de usuários conectados para os clientes restantes
      const userList = connectedClients.map((client) => ({
        id: client.socketId,
        isActive: false,
      }));
      io.emit('userList', userList);
    });
  });
};

module.exports = configureSocketIO;