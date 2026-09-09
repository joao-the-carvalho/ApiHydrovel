const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const deviceAuth = require('../middlewares/deviceAuth');
const isAuth = require('../middlewares/isAuth');

// rotas que são enviadas pelo esp
router.post('/qualidade', deviceAuth, sensorController.receberQualidade);
router.post('/vazamento', deviceAuth, sensorController.receberVazamento);

// rotas de consulta pro site/app
router.get('/qualidade/ultima', isAuth, sensorController.getUltimaQualidade);
router.get('/vazamento/ultimo', isAuth, sensorController.getUltimoVazamento);

module.exports = router;