const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Verificar se o token de autenticação está presente no cabeçalho da requisição
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    // Verificar a validade do token
    const decodedToken = jwt.verify(token, 'secret_key');

    // Adicionar o ID do usuário autenticado à requisição para uso posterior
    req.userId = decodedToken.userId;

    // Continuar para a próxima função de middleware ou rota
    next();
  } catch (error) {
    console.log('Erro ao verificar token:', error);
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
};

module.exports = authMiddleware;
