const mongoose = require('mongoose');

const DiagnosticoVazamentoSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  pressao: { type: Number, required: true },
  vazaoEntrada: { type: Number, required: true },
  vazaoSaida: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DiagnosticoVazamento', DiagnosticoVazamentoSchema);