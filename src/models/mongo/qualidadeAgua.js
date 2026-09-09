const mongoose = require('mongoose');

const QualidadeAguaSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  ph: { type: Number, required: true },
  temperatura: { type: Number, required: true },
  turbidez: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QualidadeAgua', QualidadeAguaSchema);