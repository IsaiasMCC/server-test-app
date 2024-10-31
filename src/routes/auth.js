const { Router } = require('express');
const { login, sign_up } = require('../controllers/authController');
const router = Router();

router.post('/login', login);
router.post('/signup', sign_up);

module.exports = router;