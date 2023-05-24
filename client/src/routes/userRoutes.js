const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');

// Rota para autenticação/login do usuário
router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Verificar se o usuário existe na base de dados
    const user = await UserModel.findOne({ cpf });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Comparar a senha fornecida com o hash de senha armazenado no banco de dados
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

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

// Rota para enviar mensagem no chat
router.post('/chat', async (req, res) => {
  const { sender, receiver, message } = req.body;
  
  try {
    // Verificar se os usuários existem na base de dados
    const senderUser = await UserModel.findById(sender);
    const receiverUser = await UserModel.findById(receiver);
    
    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: 'Usuário(s) não encontrado(s)' });
    }
    
    // Criar uma nova mensagem no chat
    const chat = new ChatModel({ sender, receiver, message });
    await chat.save();
    
    return res.status(200).json({ message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
});

module.exports = router;
