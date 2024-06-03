const express = require("express");
const router = express.Router();
const friendController = require('../controllers/friendController');

// Ruta para obtener todos los amigos
router.get('/', friendController.getAllFriends);

// Ruta para filtrar amigos por género y letra inicial
router.get('/filter', friendController.filterFriends);

// Ruta para obtener información específica de los headers
router.get('/info', friendController.getHeadersInfo);

// Ruta dinámica para obtener un amigo por ID
router.get('/:id', friendController.getFriendById);

// Ruta POST para agregar un nuevo amigo
router.post('/', friendController.addFriend);

// Ruta PUT para actualizar los datos de un amigo existente
router.put('/:id', friendController.updateFriend);

module.exports = router;
