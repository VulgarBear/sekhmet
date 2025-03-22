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
  bulkRegister: true,
  devGuildIds: ["1352807376104722564"],
  devRoleIds: ["1352893592556802049"],
});

client.login(process.env.TOKEN);
