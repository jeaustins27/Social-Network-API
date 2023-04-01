const connection = require("../config/connection");
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const {
  getRandomName,
  getRandomThoughtDescription,
  getThoughtReactions,
  getRandomArrItem,
} = require("./data");

connection.on("error", (err) => console.log(err));

connection.once("open", async () => {
  console.log("Connected to MongoDB");

  await User.deleteMany({});

  await Thought.deleteMany({});

  let users = [];
  let friends = [];

  for (let i = 0; i < 4; i++) {
    const username = getRandomName();
    const email = `${username.toLowerCase().split(" ").join("")}@gmail.com`;
    const password = "password123";

    for (let i = 0; i < 4; i++) {
      try {
        let friend = await getRandomArrItem(users);
        friend = new ObjectId(friend._id);
        if (!friends.includes(friend)) {
          friends.push(friend);
        } else {
          console.log("No friends found! 🤷‍♀️");
        }
      } catch (err) {
        console.log(err);
      }
    }
    users.push({ username, email, password, friends });
    friends = [];
  }
  console.log("Users created! 🧑‍🤝‍🧑");

  let thoughts = [];
  let reactions = [];
  let testCounter1 = 0;
  let testCounter2 = 0;

  for (let i = 0; i < 4; i++) {
    const thoughtText = getRandomThoughtDescription(5);
    let thoughtUserId = getRandomArrItem(users)._id;
    thoughtUserId = new ObjectId(thoughtUserId);

    testCounter1++;
    for (let i = 0; i < 4; i++) {
      const reactionBody = getThoughtReactions(5);
      let reactionUserId = getRandomArrItem(users)._id;
      reactionUserId = new ObjectId(reactionUserId);
      testCounter2++;
      reactions.push({ reactionBody, reactionUserId });
    }
    thoughts.push({ thoughtText, thoughtUserId, reactions });
    console.log(reactions);
    console.log(`testCounter2: ${testCounter2}`);
  }

  await User.collection.insertMany(users);
  console.log("Users inserted!");

  await Thought.collection.insertOne({
    thoughtText: "This is a test thought",
    username: [...users],
    reactions: [...reactions],
  });

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete!");
  process.exit(0);
});