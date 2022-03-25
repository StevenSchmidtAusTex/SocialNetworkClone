const { User, Thought, Reaction } = require('../models');

// Get all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        res.json(thoughtData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Get one thought by ID
const getOneThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
        !thoughtData 
            ? res.status(404).json({ message: 'There is no thought with that ID.' }) 
            : res.json(thoughtData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Create a new thought
const newThought = async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thoughtData._id } },
            { new: true }
        );
        res.json(thoughtData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Update a thought by ID
const updateThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        );
        !thoughtData 
            ? res.status(404).json({ message: 'There is no thought with that ID.' }) 
            : res.json(thoughtData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Delete a thought by ID
const deleteThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        !thoughtData 
            ? res.status(404).json({ message: 'There is no thought with that ID.' }) 
            : res.json(thoughtData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Add a reaction to a thought
const newReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        !thoughtData 
            ? res.status(404).json({ message: 'There is no thought with that ID.' }) 
            : res.json(thoughtData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Remove a reaction from a thought
const deleteReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        !thoughtData 
            ? res.status(404).json({ message: 'There is no thought with that ID.' }) 
            : res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = 
    { getThoughts, 
      getOneThought, 
      newThought, 
      updateThought, 
      deleteThought, 
      newReaction, 
      deleteReaction };