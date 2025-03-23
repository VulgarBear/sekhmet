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

// Cute Helper
// Generates cute animal picture
// dogURL: 'https://random.dog/doggos'
// foxURL: 'https://randomfox.ca/floof/'
// catURL: 'https://api.thecatapi.com/v1/images/search'
// birbURL: 'http://shibe.online/api/birds?&urls=true&httpsUrls=true'

// Insult Helper
// Generates random insult from Evil Insult API

// Kitsu Helper
// Get's anime or manga information based on command useage.

// TMDB Helper
// Fetches information about a movie, series, or actor

//Bored Helper
// Fetches random thing to do when bored
const bored = async () => {
  const boredSearch = await axios.get(
    "https://bored-api.appbrewery.com/random"
  );

  const boredData = boredSearch.data.activity;
  return boredData;
};

module.exports = {
  bored,
  eightBall,
};
