const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const httpServer = http.createServer(app);
app.use(cookieParser());
app.use(cors());


// Configurar a conexão com o MongoDB
mongoose
  .connect('mongodb://localhost:27017/chat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB:', error);
  });

// Middleware para o corpo das requisições
app.use(express.json());

// Middleware para configurar os atributos SameSite e Secure para todos os cookies enviados nas respostas do servidor
app.use((req, res, next) => {
  res.setHeader('Set-Cookie', 'SameSite=None; Secure');
  next();
});

// Rota para autenticação/login do usuário
app.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Verificar se o usuário existe na base de dados
    const user = await UserModel.findOne({ cpf });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Comparar a senha fornecida com o hash de senha armazenado no banco de dados
    const isPasswordValid = await bcrypt.compare(senha, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar um token de autenticação
    const token = jwt.sign({ userId: user._id }, 'seu-segredo-aqui');

    // Retornar o token para o cliente
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

// Rota para lidar com a solicitação POST em "/"
app.post('/', (req, res) => {
  // Lógica para lidar com a solicitação POST em "/"
  // Aqui você pode processar os dados enviados no corpo da solicitação (req.body) e enviar uma resposta adequada

  // Exemplo de envio de uma resposta de sucesso com os dados recebidos
  const { nome, idade } = req.body;
  res.status(200).json({ message: 'Solicitação POST recebida com sucesso', nome, idade });
});


// Rota de exemplo para configurar um cookie com atributos SameSite e Secure
app.get('/example-route', (req, res) => {
  // Configurar os atributos SameSite e Secure para todos os cookies enviados nas respostas do servidor
  res.setHeader('Set-Cookie', [
    'cookieName1=cookieValue1; SameSite=None; Secure',
    'cookieName2=cookieValue2; SameSite=None; Secure',
    'cookieName3=cookieValue3; SameSite=None; Secure'
  ]);

  res.send('Cookies configurados corretamente');
});

// Usar as rotas no aplicativo
app.use('/users', userRoutes);
app.use('/sockets', socketRoutes);

const httpPort = 8000;
const socketIOPort = 9000;

httpServer.listen(httpPort, () => {
  console.log(`Servidor HTTP rodando em http://localhost:${httpPort}`);
});

// Iniciar o servidor Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// Lista de usuários conectados
let connectedUsers = [];

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Adicionar o usuário à lista de usuários conectados
  socket.on('addUser', (user) => {
    const existingUser = connectedUsers.find((u) => u.id === user.id);
    if (!existingUser) {
      connectedUsers.push(user);
    }

    // Enviar a lista de usuários conectados para todos os clientes
    io.emit('userList', connectedUsers);
  });

  socket.on('sendMessage', (message, receiverId) => {
    // Lógica para enviar a mensagem para o destinatário correto
    // ...

    // Enviar a mensagem apenas para o destinatário
    const receiverSocket = connectedUsers.find((user) => user.id === receiverId);
    if (receiverSocket) {
      io.to(receiverSocket.socketId).emit('message', message, socket.id);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');

    // Remover o usuário da lista de usuários conectados
    connectedUsers = connectedUsers.filter((user) => user.socketId !== socket.id);

    // Enviar a nova lista de usuários conectados para todos os clientes
    io.emit('userList', connectedUsers);
  });
});

io.listen(socketIOPort, () => {
  console.log(`Servidor Socket.IO rodando em http://localhost:${socketIOPort}`);
});