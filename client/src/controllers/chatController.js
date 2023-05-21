const Conversation = require('../models/ChatModel');

// Função para obter o chat
const getChat = async (req, res) => {
  try {
    // Verificar o usuário autenticado a partir do middleware
    const user = req.user;

    // Obter todas as conversas do banco de dados
    const conversations = await Conversation.find();

    // Retornar as conversas para o cliente
    return res.status(200).json({ conversations });
  } catch (error) {
    console.log('Erro ao obter o chat:', error);
    return res.status(500).json({ message: 'Erro ao obter o chat' });
  }
};

// Função para enviar uma mensagem no chat
const sendMessage = async (req, res) => {
  try {
    // Verificar o usuário autenticado a partir do middleware
    const user = req.user;

    // Obter os dados da mensagem do corpo da requisição
    const { conversationId, message } = req.body;

    // Encontrar a conversa pelo ID
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversa não encontrada' });
    }

    // Adicionar a mensagem à conversa
    conversation.messages.push({
      user: user._id,
      content: message,
    });

    // Salvar as alterações da conversa no banco de dados
    await conversation.save();

    // Retornar a mensagem enviada para o cliente
    return res.status(200).json({ message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.log('Erro ao enviar mensagem:', error);
    return res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
};

module.exports = {
  getChat,
  sendMessage,
};
