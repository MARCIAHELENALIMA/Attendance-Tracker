const User = require('../models/UserModel');
const Chat = require('../models/ChatModel');


// Armazenar os usuários online
const onlineUsers = new Map();

// Função para lidar com a conexão de um novo socket
const handleConnection = (socket) => {
  console.log('Novo socket conectado:', socket.id);

  // Evento disparado quando um novo usuário se conecta
  socket.on('join', async (userId) => {
    try {
      // Verificar se o usuário existe no banco de dados
      const user = await User.findById(userId);
      if (!user) {
        return socket.emit('error', 'Usuário não encontrado');
      }

      // Armazenar o ID do socket do usuário na lista de usuários online
      onlineUsers.set(userId, socket.id);

      // Emitir evento informando que o usuário está online para todos os sockets conectados
      io.emit('userOnline', userId);

      console.log(`Usuário ${userId} conectado`);

      // Enviar lista de usuários online para o usuário recém-conectado
      const onlineUserIds = Array.from(onlineUsers.keys());
      socket.emit('onlineUsers', onlineUserIds);
    } catch (error) {
      console.log('Erro ao conectar usuário:', error);
      socket.emit('error', 'Erro ao conectar usuário');
    }
  });

  // Evento disparado quando um usuário envia uma mensagem
  socket.on('sendMessage', async (messageData) => {
    try {
      const { sender, receiver, message } = messageData;

      // Verificar se o remetente e o destinatário estão online
      const senderSocketId = onlineUsers.get(sender);
      const receiverSocketId = onlineUsers.get(receiver);
      if (!senderSocketId || !receiverSocketId) {
        return socket.emit('error', 'Usuário(s) não encontrado(s) ou offline');
      }

      // Criar uma nova mensagem no chat
      const chat = new Chat({ sender, receiver, message });
      await chat.save();

      // Enviar a mensagem para o remetente e o destinatário
      io.to(senderSocketId).emit('receiveMessage', chat);
      io.to(receiverSocketId).emit('receiveMessage', chat);
    } catch (error) {
      console.log('Erro ao enviar mensagem:', error);
      socket.emit('error', 'Erro ao enviar mensagem');
    }
  });

  // Evento disparado quando um socket é desconectado
  socket.on('disconnect', () => {
    // Encontrar o usuário desconectado pelo ID do socket
    const disconnectedUserId = Array.from(onlineUsers.entries()).find(
      ([userId, socketId]) => socketId === socket.id
    )?.[0];

    if (disconnectedUserId) {
      // Remover o usuário da lista de usuários online
      onlineUsers.delete(disconnectedUserId);

      // Emitir evento informando que o usuário está offline para todos os sockets conectados
      io.emit('userOffline', disconnectedUserId);

      console.log(`Usuário ${disconnectedUserId} desconectado`);
    }
  });
};

module.exports = handleConnection;
