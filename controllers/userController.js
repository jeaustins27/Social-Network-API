const { User, Thought } = require("../models");

module.exports = {
    // Gets all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //   Gets a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //   Creates a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //   Deletes a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : Thought.deleteMany({ username: { $in: User.username } })
            )
            .then(() => res.json({ message: "User and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    //   Updates a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //  Adds a friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { friends: req.params.friendId } },
          {
            new: true,
            runValidators: true,
          }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with that ID" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    //   Removes a friend from a user's friend list
      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $pull: {
              friends: req.params.friendId,
            },
          },
          { new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with that ID" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
};