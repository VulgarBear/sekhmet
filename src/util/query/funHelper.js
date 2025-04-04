const axios = require("axios");
const logger = require("../client/logger");

// 8ball
// Generates random 8ball result
const eightBall = async () => {
  const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
  ];

  const answer = answers[Math.floor(Math.random() * answers.length)];
  return answer;
};

// Insult Helper
// Gets random insult from vulgarAPI
const insultGet = async () => {
  const insultSearch = await axios.get(process.env.VULGAR_INSULT_URL);
  const insultData = insultSearch.data;
  return insultData;
};

// Posts user generated insult to the API
const insultPost = async (insultNew, user) => {
  let data = JSON.stringify({
    insult: `${insultNew}`,
    author: `${user}`,
  });

  let config = {
    method: "post",
    maxBodyLength: 150,
    url: process.env.VULGAR_INSULT_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const insultRes = await axios
    .request(config)
    .then((response) => {
      logger.info(JSON.stringify(response.data));
    })
    .catch((error) => {
      logger.error(error);
    });
};

//Bored Helper
// Fetches random thing to do when bored
const bored = async () => {
  const boredSearch = await axios.get(
    "https://bored-api.appbrewery.com/random"
  );

  const boredData = boredSearch.data.activity;
  return boredData;
};

// Animechan; Anime Quotes
const aniQuote = async () => {
  const aniQuoteSearch = await axios.get(
    "https://animechan.io/api/v1/quotes/random"
  );

  const aniQuote = aniQuoteSearch.data;
  return aniQuote;
};

// Kitsu Helper
// Get's anime or manga information based on command useage.

const kitsu = async (type, name) => {
  const MANGA_URL = "https://kitsu.io/api/edge/manga";

  if (type === "anime") {
    const res = await axios.get(
      `http://kitsu.io/api/edge/anime?filter[text]=${name}&page[limit]=1&json=true`
    );

    const searchData = res.data.data[0];
    return searchData;
  } else if (type === "manga") {
    const res = await axios.get(
      `${MANGA_URL}?filter[text]=${name}&page[limit]=1`
    );

    const searchData = res.data.data[0];
    return searchData;
  } else {
  }
};

// Scryfall
// Search for a MTG card

const scryfall = async (card) => {
  console.log(card);
  const scrySearch = await axios.get(
    `https://api.scryfall.com/cards/search?q=${card}&format=json`
  );

  const scryData = scrySearch.data.data[0];
  console.log(scryData.name);
  return scryData;
};

// Export above axios searches
module.exports = {
  bored,
  eightBall,
  insultGet,
  insultPost,
  aniQuote,
  kitsu,
  scryfall,
};
