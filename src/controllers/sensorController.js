const QualidadeAgua = require('../models/mongo/qualidadeAgua');
const DiagnosticoVazamento = require('../models/mongo/diagnosticoVazamento');

// POST /api/sensors/qualidade (ESP32)
exports.receberQualidade = async (req, res) => {
  try {
    const novaLeitura = new QualidadeAgua(req.body);
    await novaLeitura.save();
    return res.status(201).json({ success: true, message: 'Qualidade da água salva com sucesso' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Erro ao salvar qualidade da água', details: error.message });
  }
};

// POST /api/sensors/vazamento (ESP32)
exports.receberVazamento = async (req, res) => {
  try {
    const novaLeitura = new DiagnosticoVazamento(req.body);
    await novaLeitura.save();
    return res.status(201).json({ success: true, message: 'Dados de vazamento salvos com sucesso' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Erro ao salvar dados de vazamento', details: error.message });
  }
};

// GET /api/sensors/qualidade/ultima (App / Front-end)
exports.getUltimaQualidade = async (req, res) => {
  try {
    const ultima = await QualidadeAgua.findOne().sort({ timestamp: -1 });
    return res.json(ultima || {});
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Erro ao buscar última leitura de qualidade' });
  }
};

// GET /api/sensors/vazamento/ultimo (App / Front-end)
exports.getUltimoVazamento = async (req, res) => {
  try {
    const ultimo = await DiagnosticoVazamento.findOne().sort({ timestamp: -1 });
    return res.json(ultimo || {});
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Erro ao buscar último diagnóstico de vazamento' });
  }
};