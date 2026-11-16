const express = require('express');
const router = express.Router();
const notifController = require('../controllers/notifController');
const deviceAuth = require('../middlewares/deviceAuth');
const isAuth = require('../middlewares/isAuth');

// rotas que são enviadas pelo esp
router.post('/notificacoes', deviceAuth, notifController.mandarNotificacao);

// rotas de consulta pro site/app
router.get('/notificacoes/', isAuth, notifController.getAllNotificacoes);
router.get('/notificacoes/usuario/:id', isAuth, notifController.getNotificacoes);

// rota pra atualizar e marcar como lida
router.patch('notificacoes/:notifId/lida', isAuth, notifController.marcarComoLida);

module.exports = router;