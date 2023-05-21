const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const userRoutes = require('./client/src/routes/userRoutes');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurar a conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/chat_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB:', error);
  });

// Importar as rotas
const socketRoutes = require('./client/src/routes/socketRoutes');

// Usar as rotas no aplicativo
app.use('/users', userRoutes);
app.use('/sockets', socketRoutes);

// Iniciar o servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
