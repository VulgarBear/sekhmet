const axios = require('axios')
const logger = require('../client/logger')

/**
 * Sends a prompt to Ollama and returns the response
 * @param {string} prompt - The prompt to send to Ollama
 * @param {string} model - The model to use (default: 'llama2')
 * @param {Object} options - Additional options for the request
 * @returns {Promise<string>} - The response from Ollama
 */
async function queryOllama (prompt, model = 'llama3.2:1b', options = {}) {
  try {
    const data = JSON.stringify({
      model,
      prompt,
      stream: false,
      num_predict: 1000
    })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.OLLAMA_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }

    const response = await axios.request(config)

    return response.data.response
  } catch (error) {
    logger.error(`Error querying Ollama: ${error.message}`)
    throw error
  }
}

module.exports = {
  queryOllama
}
