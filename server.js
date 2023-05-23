const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const userRoutes = require('./client/src/routes/userRoutes');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors');


// Configurar a conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/chat_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB:', error);
  });
 
app.use(cors());

// Configurações do socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

// Aqui você pode definir eventos e ouvir as mensagens do cliente

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});


// Importar as rotas
const socketRoutes = require('./client/src/routes/socketRoutes');

// Middleware para o corpo das requisições
app.use(express.json());

// Rota para autenticação/login do usuário
app.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Verificar se o usuário existe na base de dados
    // Você precisa implementar a lógica para verificar o usuário no banco de dados
    // e validar as credenciais
    if (cpf === 'usuario' && senha === 'senha') {
      // Se as credenciais forem válidas, retornar um token de autenticação
      const token = 'seu-token-gerado-aqui';
      return res.status(200).json({ token });
    } else {
      // Se as credenciais forem inválidas, retornar uma mensagem de erro
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

// Usar as rotas no aplicativo
app.use('/users', userRoutes);
app.use('/sockets', socketRoutes);

// Iniciar o servidor
const port = app.listen(8000, () => {
  console.log('Servidor rodando em http://localhost:8000');
});