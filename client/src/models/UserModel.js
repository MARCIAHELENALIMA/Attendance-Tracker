const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Antes de salvar o usuário no banco de dados, criptografa a senha
userSchema.pre('save', async function (next) {
  const user = this;

  // Verifica se a senha foi modificada ou é nova
  if (!user.isModified('password')) return next();

  try {
    // Gera um hash criptografado para a senha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    // Substitui a senha pela versão criptografada
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
