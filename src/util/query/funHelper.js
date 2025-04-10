const axios = require('axios')
const logger = require('../client/logger')

/**
 * The function `eightBall` asynchronously returns a random answer from a predefined list of responses
 * typically associated with a magic 8-ball.
 * @returns The function `eightBall` returns a random answer from the `answers` array.
 */

const eightBall = async () => {
  const answers = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    "Don't count on it",
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful'
  ]

  const answer = answers[Math.floor(Math.random() * answers.length)]
  return answer
}

/**
 * The function insultGet asynchronously fetches insults from a specified URL using axios.
 * @returns The `insultGet` function is returning the data fetched from the `VULGAR_INSULT_URL`
 * endpoint after making a GET request using Axios.
 */

const insultGet = async () => {
  const insultSearch = await axios.get(process.env.VULGAR_INSULT_URL)
  const insultData = insultSearch.data
  return insultData
}

/**
 * The function `insultPost` sends a new insult and the author's name to a specified URL using a POST
 * request with Axios.
 * @param insultNew - A new insult to insert into the database, passed from the post-insult command
 * @param user - The user who is posting the insult, passed from the post-insult command
 */

const insultPost = async (insultNew, user) => {
  const data = JSON.stringify({
    insult: `${insultNew}`,
    author: `${user}`
  })

  const config = {
    method: 'post',
    maxBodyLength: 300,
    url: process.env.VULGAR_INSULT_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  const insultRes = await axios
    .request(config)
    .then((response) => {
      logger.info(JSON.stringify(response.data))
    })
    .catch((error) => {
      logger.error(error)
    })
}

/**
 * The function bored asynchronously fetches a random activity from the Bored API and returns it.
 * @returns The `bored` function is returning a random activity fetched from the
 * "https://bored-api.appbrewery.com/random" API.
 */

const bored = async () => {
  const boredSearch = await axios.get(
    'https://bored-api.appbrewery.com/random'
  )

  const boredData = boredSearch.data.activity
  return boredData
}

/**
 * The function aniQuote asynchronously fetches a random anime quote from the animechan.io API.
 * @returns The `aniQuote` function is returning a random anime quote fetched from the
 * "https://animechan.io/api/v1/quotes/random" API endpoint.
 */

const aniQuote = async () => {
  const aniQuoteSearch = await axios.get(
    'https://animechan.io/api/v1/quotes/random'
  )

  const aniQuote = aniQuoteSearch.data
  return aniQuote
}

/**
 * The function `kitsu` is an asynchronous function that fetches data from the Kitsu API based on the
 * type (anime or manga) and name provided.
 * @param type - The `type` parameter in the `kitsu` function specifies whether you want to search for
 * anime or manga.
 * @param name - The `name` parameter in the `kitsu` function represents the name of the anime or manga
 * you want to search for in the Kitsu database.
 * @returns The function `kitsu` is an asynchronous function that takes in two parameters `type` and
 * `name`. It makes a request to the Kitsu API based on the `type` provided (either "anime" or "manga")
 * and the `name` of the anime or manga being searched for. If the `type` is "anime", it makes a GET
 * request to the anime endpoint
 */

const kitsu = async (type, name) => {
  const MANGA_URL = 'https://kitsu.io/api/edge/manga'

  if (type === 'anime') {
    const res = await axios.get(
      `http://kitsu.io/api/edge/anime?filter[text]=${name}&page[limit]=1&json=true`
    )

    const searchData = res.data.data[0]
    return searchData
  } else if (type === 'manga') {
    const res = await axios.get(
      `${MANGA_URL}?filter[text]=${name}&page[limit]=1`
    )

    const searchData = res.data.data[0]
    return searchData
  } else {
  }
}

/**
 * The function `scryfall` takes a card name as input, performs a search on the Scryfall API, and
 * returns the data of the first matching card.
 * @param card - The `card` parameter in the `scryfall` function is used to specify the name of the
 * card you want to search for on the Scryfall API.
 * @returns The function `scryfall` is returning the data of the first card that matches the search
 * query from the Scryfall API.
 */
const scryfall = async (card) => {
  console.log(card)
  const scrySearch = await axios.get(
    `https://api.scryfall.com/cards/search?q=${card}&format=json`
  )

  const scryData = scrySearch.data.data[0]
  console.log(scryData.name)
  return scryData
}

/* The `module.exports` statement in Node.js is used to export functions, objects, or values from a
module so that they can be imported and used in other parts of the application. */

module.exports = {
  bored,
  eightBall,
  insultGet,
  insultPost,
  aniQuote,
  kitsu,
  scryfall
}
