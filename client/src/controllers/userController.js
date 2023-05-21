const User = require('../models/UserModel');

// Função para obter informações do usuário
const getUser = async (req, res) => {
  try {
    // Verificar o usuário autenticado a partir do middleware
    const user = req.user;

    // Obter informações do usuário a partir do banco de dados
    const userInfo = await User.findById(user._id);

    // Retornar as informações do usuário para o cliente
    return res.status(200).json({ user: userInfo });
  } catch (error) {
    console.log('Erro ao obter informações do usuário:', error);
    return res.status(500).json({ message: 'Erro ao obter informações do usuário' });
  }
};

// Função para atualizar informações do usuário
const updateUser = async (req, res) => {
  try {
    // Verificar o usuário autenticado a partir do middleware
    const user = req.user;

    // Obter os dados atualizados do usuário do corpo da requisição
    const { nome, email } = req.body;

    // Atualizar as informações do usuário no banco de dados
    await User.findByIdAndUpdate(user._id, { nome, email });

    return res.status(200).json({ message: 'Informações do usuário atualizadas com sucesso' });
  } catch (error) {
    console.log('Erro ao atualizar informações do usuário:', error);
    return res.status(500).json({ message: 'Erro ao atualizar informações do usuário' });
  }
};

// Função para buscar usuários por nome ou email
const findUsers = async (req, res) => {
  try {
    // Verificar o usuário autenticado a partir do middleware
    const user = req.user;

    // Obter o termo de busca a partir dos parâmetros da requisição
    const { termo } = req.query;

    // Realizar a busca de usuários no banco de dados
    const users = await User.find({
      $or: [
        { nome: { $regex: termo, $options: 'i' } },
        { email: { $regex: termo, $options: 'i' } },
      ],
    });

    // Retornar os usuários encontrados para o cliente
    return res.status(200).json({ users });
  } catch (error) {
    console.log('Erro ao buscar usuários:', error);
    return res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

module.exports = {
  getUser,
  updateUser,
  findUsers,
};
