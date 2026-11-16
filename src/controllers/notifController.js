const Notificacoes = require('../models/mongo/notificacoes');
const User = require('../models/mysql/User');

exports.mandarNotificacao = async (req, res) => {
  try{
    const { userId, msg, type } = req.body;
    const usuarioExiste = await User.findByPk(userId); // verifica se o usuario existe, se num existe nem tenta
    if(!usuarioExiste){
      return res.status(404).json({success: false, error: "O usuário não foi encontrado no MySQL."});
    }
    const novaNotificacao = await Notificacoes.create({
      userId: usuarioExiste.id,
      msg,
      type
    });
    return res.status(201).json({success: true, data: novaNotificacao});
  }
  catch (error){
    return res.status(500).json({success: false, error: error.message});
  }
};

exports.getNotificacoes = async (req, res) => {
  try{
    const { id } = req.body;
    const notificacoes = await Notificacoes.find({userId: Number(id)}).sort({timestamp: -1});

    return res.json({success: true, data: notificacoes});
  }
  catch(error){
    return res.status(500).json({success: false, error: error.message});
  }
};

exports.getAllNotificacoes = async (req, res) => {
  try{
    const notificacoes = await Notificacoes.find().sort({timestamp: -1});
    return res.json({success: true, data: notificacoes});
  }
  catch(error){
    return res.status(500).json({success: false, error: error.message});
  }
};

exports.marcarComoLida = async (req, res) => {
  try{
    const { notifId } = req.params;
    const notificacao = await Notificacoes.findByIdAndUpdate(
      notifId,
      {lida: true},
      {new: true}
    );
    if(!notificacao){
      return res.status(404).json({success: false, error: "Notificação não encontrada"});
    }
    return res.json({ success: true, data: notificacao });
  }
  catch(error){
    return res.status(500).json({success: false, error: error.message});
  }
};