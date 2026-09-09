module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.ESP32_API_KEY) {
    return res.status(403).json({ error: 'Chave de API do dispositivo inválida ou ausente' });
  }

  return next();
};