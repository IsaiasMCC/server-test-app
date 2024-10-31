const { Router } = require('express');
const { perfil } = require('../controllers/userController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',[validarJWT],perfil);

module.exports = router;