const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const User = require('../models/mysql/User');


const generateAccessToken = (usuarioId, nome) => {
  return jwt.sign(
    { id: usuarioId, nome },
    process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
    { expiresIn: '24h' }
  );
};
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuarioExiste = await User.findOne({ where: { email } });
    if (usuarioExiste) {
      return res.status(400).json({ success: false, error: 'E-mail já cadastrado' });
    }
    const senhaHashada = await bcrypt.hash(senha, 10);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaHashada

    });
    const accessToken = generateAccessToken(usuario.id, usuario.nome);

    res.status(201).json({
      success: true,
      user: { id: usuario.id, nome: usuario.nome, email: usuario.email },
      token: accessToken
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, details: err.errors });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log("--> Tentativa de login para:", email);

    const usuario = await User.findOne({ where: { email: email.trim().toLowerCase() } });
    if (!usuario) {
      console.log("--> Usuário não encontrado no MySQL");
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log("--> Senha bateu?:", senhaValida);

    if (!senhaValida) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'sua_chave_secreta',
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};