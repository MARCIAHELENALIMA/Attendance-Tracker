const express = require('express');
const router = express.Router();
const expressWs = require('express-ws')(router);

// Importar o controlador de sockets
const socketController = require('../controllers/socketController');

// Rota para lidar com a conexão do socket
router.ws('/connect', socketController.connect);

// Rota para lidar com o recebimento de mensagens
router.ws('/message', socketController.receiveMessage);

module.exports = router;


