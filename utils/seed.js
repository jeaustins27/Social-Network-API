const connection = require("../config/connection");
const { User, Thought } = require("../models");

const {
  getRandomUsername,
  getRandomArrItem,
  genRandomIndex,
  getRandomThought,
} = require("./data");

connection.on("error", (err) => err);


connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});

  const thoughtCreation = getRandomThought(5);
  await Thought.collection.insertMany(thoughtCreation);

  const users = [];

  for (let i = 0; i < 10; i++) {
    const username = getRandomUsername();
    const split = username.split(" ");
    const split1 = split[0];
    const split2 = split[1];
    const email = `${split1}${split2}@gmail.com`;

    users.push({
      username: username,
      email,
      thoughts: [thoughtCreation[genRandomIndex(thoughtCreation)]._id],
    });
  }

  await User.collection.insertMany(users);

  console.table(User);
  console.table(Thought, ["thoughText", "username", "reactions"]);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});