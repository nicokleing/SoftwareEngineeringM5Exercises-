const express = require("express");
const router = express.Router();
const friends = require('../models/friends');

// Ruta para obtener todos los amigos
router.get('/', (req, res) => {
    res.json(friends);
});

// Ruta para filtrar amigos por género y letra inicial
router.get('/filter', (req, res) => {
    console.log(req.query);
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;
    let matchingFriends = [...friends];

    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => friend.gender == filterGender);
    }
    if (filterLetter) {
        matchingFriends = matchingFriends.filter(friend => friend.name.startsWith(filterLetter));
    }
    
    if (matchingFriends.length > 0) {
        res.status(200).json(matchingFriends);
    } else {
        res.status(404).json({ error: "No friends matching the criteria" });
    }
});

// Ruta para obtener información específica de los headers
router.get('/info', (req, res) => {
    console.log(req.headers);
    const { 'user-agent': userAgent, 'content-type': contentType, 'accept': accept } = req.headers;
    res.json({ userAgent, contentType, accept });
});

// Ruta dinámica para obtener un amigo por ID
router.get('/:id', (req, res) => {
    console.log(req.params);
    let friendId = req.params.id;
    let friend = friends.find(friend => friend.id == friendId);

    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({ error: `Friend with ID ${friendId} not found` });
    }
});

// Ruta POST para agregar un nuevo amigo
router.post('/', (req, res) => {
    let newFriend = req.body;
    console.log(newFriend);

    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({ error: 'Friend object must contain a name and gender' });
        return;
    }
    if (!newFriend.id) {
        newFriend.id = friends.length + 1;
    }

    friends.push(newFriend);
    res.status(200).json(newFriend);
});

// Ruta PUT para actualizar los datos de un amigo existente
router.put('/:id', (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;
    let index = friends.findIndex(friend => friend.id == friendId);

    if (index !== -1) {
        friends[index] = { ...friends[index], ...updatedFriend };
        res.status(200).json(friends[index]);
    } else {
        res.status(404).json({ error: `Friend with ID ${friendId} not found` });
    }
});

module.exports = router;
