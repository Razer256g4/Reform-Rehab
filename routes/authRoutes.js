const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.loginPage);
router.get('/register', authController.registerPage);
router.post('/auth', authController.login);
router.post('/register', authController.register);
router.get('/home', authController.home);

module.exports = router;
