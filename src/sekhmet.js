require("dotenv/config");

const { Client, IntentsBitField } = require("discord.js");
const { CommandKit } = require("commandkit");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  devGuildIds: ["620103284681736194"],
  devRoleIds: ["1352780554831138876"],
});

client.login(process.env.TOKEN);
