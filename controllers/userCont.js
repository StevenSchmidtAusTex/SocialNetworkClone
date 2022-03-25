const { User, Thought } = require('../models');


// Get all users
const getUsers = async (req, res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Get one user along with their thought data
const getOneUser = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts', 'friends')
        !userData 
            ? res.status(404).json({ message: 'There is no User with that ID' }) 
            : res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Create a new user
const newUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
        );
        !userData 
            ? res.status(404).json({ message: 'There is no User with that ID' }) 
            : res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userData = await User.findOneAndRemove({ _id: req.params.userId });
        if (!userData) {
            res.status(404).json({ message: 'There is no User with that ID' }); 
        } else {
            const thoughtData = await Thought.deleteMany({ username: userData.username });
            res.json(userData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Add a user to friend's list
const addFriend = async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        !userData 
            ? res.status(404).json({ message: 'There is no User with that ID' }) 
            : res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Remove a user from friend's list
const removeFriend = async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        !userData 
            ? res.status(404).json({ message: 'There is no User with that ID' }) 
            : res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


module.exports = { getUsers, 
                   getOneUser, 
                   newUser, 
                   updateUser, 
                   deleteUser, 
                   addFriend, 
                   removeFriend };