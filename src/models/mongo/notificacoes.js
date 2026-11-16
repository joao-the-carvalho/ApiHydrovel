const mongoose = require('mongoose');

const NotificacoesSchema = new mongoose.Schema({
  userId: { type: Number, required: true, index: true },
  msg: { type: String, required: true },
  type: { type: Number, required: true },
  lida: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notificacoes', NotificacoesSchema);