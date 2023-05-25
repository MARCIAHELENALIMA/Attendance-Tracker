const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
  messages: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
