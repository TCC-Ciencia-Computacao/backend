const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController');

router.get('/login/:user/:pass' , UsuarioController.login);

module.exports = router;