const router = require('express').Router();
const UserController = require('../controllers/userController');
const check = require('../middlewares/isAuth');

router.get('/id/:id', check, UserController.getUsuario);
router.get('/all', check, UserController.getAllUsers);

module.exports = router;