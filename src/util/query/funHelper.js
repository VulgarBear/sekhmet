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
// Generates random insult from Evil Insult API
const insult = async () => {
  const insultSearch = await axios.get(
    "https://evilinsult.com/generate_insult.php?lang=en&type=json"
  );
  const insultData = insultSearch.data.insult;
  return insultData;
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

module.exports = {
  bored,
  eightBall,
  insult,
  aniQuote,
};
