const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Função para realizar o login do usuário
const login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ cpf });
    if (!user) {
      return res.status(401).json({ message: 'CPF inválido' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gerar um token de autenticação
    const token = jwt.sign({ userId: user._id }, 'secret_key');

    // Retornar o token para o cliente
    return res.status(200).json({ token });
  } catch (error) {
    console.log('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login' });
  }
};

// Função para registrar um novo usuário
const register = async (req, res) => {
  const { nome, cpf, senha } = req.body;

  try {
    // Verificar se o usuário já está cadastrado
    const existingUser = await User.findOne({ cpf });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar um novo usuário
    const newUser = new User({
      nome,
      cpf,
      senha: hashedPassword,
    });

    // Salvar o novo usuário no banco de dados
    await newUser.save();

    return res.status(200).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.log('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

module.exports = {
  login,
  register,
};
