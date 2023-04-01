const username = [
    "Adam",
    "Bill",
    "Craig",
    "Daniel",
    "Eric",
    "Frank",
    "George",
    "Harold",
    "Isaac",
    "James",
    "Kevin",
    "Liam",
    "Mary",
    "Nancy",
    "Oscr",
    "Peter",
    "Quincy",
    "Rick",
    "Sarah",
    "Timothy",
    "Umar",
    "Victor",
    "William",
    "Xavier",
    "Yasmin",
    "Zoey",
  ];
  const thoughts = [
    "Green apples are the best",
    "Lemonade is the best drink",
    "McDonalds is the best fast food",
    "Call of Duty is the best game",
    "PC is the best gaming platform",
  ];
  const reactions = [
    "Red apples are better",
    "Arnold Palmer is the best drink",
    "I agree with you",
    "Halo is better than Call of Duty",
    "PC or nothing!",
  ];
  
  const getRandomArrItem = (item) => {
    return item[Math.floor(Math.random() * item.length)];
  };
  
  const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
  
  const getRandomUsername = () => {
    return `${getRandomArrItem(username)} ${getRandomArrItem(username)} `;
  };

  const getRandomReaction = (int) => {
    if (int === 1) {
      return getRandomArrItem(reactions);
    }
  
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomUsername(),
      });
    }
    return results;
  };
  
  const getRandomThought = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomUsername(),
        reactions: [...getRandomReaction(2)],
      });
    }
    return results;
  };
  
  module.exports = {
    getRandomUsername,
    getRandomArrItem,
    genRandomIndex,
    getRandomThought,
  };