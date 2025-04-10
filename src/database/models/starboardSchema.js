const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Count: Number
})

module.exports = mongoose.model('starboardChannels', Schema)
