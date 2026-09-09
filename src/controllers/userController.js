const sequelize = require('../config/database');
const defineUser = require('../models/mysql/User');
const Usuario = typeof defineUser === 'function';

exports.getUsuario = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, data: usuario });
};

exports.getAllUsers = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json({ success: true, data: usuarios });
};