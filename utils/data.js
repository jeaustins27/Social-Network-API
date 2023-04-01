const names = [
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
  const thoughtDescriptions = [
    "Green apples are the best",
    "Lemonade is the best drink",
    "McDonalds is the best fast food",
    "Call of Duty is the best game",
    "PC is the best gaming platform",
  ];
  const reactionDescriptions = [
    "Red apples are better",
    "Arnold Palmer is the best drink",
    "I agree with you",
    "Halo is better than Call of Duty",
    "PC or nothing!",
  ];
  
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
  const getRandomThoughtDescription = (int) => {
   let results = [];
   for(let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughtDescriptions),
        username: getRandomName(),
        reactions: [...getThoughtReactions(3)],
      });
    }
    return results;
  };
  
  
  const getThoughtReactions = (int) => {
   if (int === 1) {
      return getRandomArrItem(reactionDescriptions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactionDescriptions),
        username: getRandomName(),
      });
    }
    return results;
  };
  
  
  module.exports = {
    getRandomName,
    getRandomThoughtDescription,
    getThoughtReactions,
    getRandomArrItem,
  };