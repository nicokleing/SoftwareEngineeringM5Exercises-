const friends = require('../models/friends');

const getAllFriends = (req, res) => {
    res.json(friends);
};

const filterFriends = (req, res) => {
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
};

const getHeadersInfo = (req, res) => {
    console.log(req.headers);
    const { 'user-agent': userAgent, 'content-type': contentType, 'accept': accept } = req.headers;
    res.json({ userAgent, contentType, accept });
};

const getFriendById = (req, res) => {
    console.log(req.params);
    let friendId = req.params.id;
    let friend = friends.find(friend => friend.id == friendId);

    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({ error: `Friend with ID ${friendId} not found` });
    }
};

const addFriend = (req, res) => {
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
};

const updateFriend = (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;
    let index = friends.findIndex(friend => friend.id == friendId);

    if (index !== -1) {
        friends[index] = { ...friends[index], ...updatedFriend };
        res.status(200).json(friends[index]);
    } else {
        res.status(404).json({ error: `Friend with ID ${friendId} not found` });
    }
};

module.exports = {
    getAllFriends,
    filterFriends,
    getHeadersInfo,
    getFriendById,
    addFriend,
    updateFriend
};
