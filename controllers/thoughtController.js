const { Thought, User } = require("../models");

module.exports = {
    // Gets all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Gets a single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Creates a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: thought.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({
                            message:
                                "Thought created, but found no user with that username",
                        })
                    : res.json("Created the thought")
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Deletes a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                }
            })
            .then(() => res.json({ message: "Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    // Updates a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No Thought with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Adds a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this id!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Removes a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {
                $pull: {
                    reactions: { reactionId: req.params.reactionId },
                },
            },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "No reaction found with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};