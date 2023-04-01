const { User, Thought } = require("../models");

module.exports = {
  // Gets all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Gets a single thought by the thought's ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })

      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Creates a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thougths: thought._id } },
          { runValidators: true, new: true }
        ).then((thought) =>
          !thought
            ? res
              .status(400)
              .json({ message: "No username found with that ID" })
            : res.status(200).json({ message: "Thought has been created" })
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Updates a thought by the thought's ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(400).json({ message: "No thought found with that ID" })
          : res.status(200).json(updatedThought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Deletes a single thought by the thought's ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId, })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought found with that ID" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        ).then((thought) =>
          !thought
            ? res
              .status(400)
              .json({ message: "Thought created but no user was found" })
            : res
              .status(200)
              .json({ message: "Thought has been deleted" })
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Adds a reaction to a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId, },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(400).json({ message: "No thought found with that ID" })
          : res.status(200).json(reaction)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Deletes a reaction from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId, },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(500).json({ message: "No thought found with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};