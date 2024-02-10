const express = require('express');
const router = express.Router();
const AuthController = require('./controllers/AuthController');

router.post('/admin/login', AuthController.login);

module.exports = router;
