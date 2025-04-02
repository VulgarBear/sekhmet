require("dotenv/config");
const { Client, IntentsBitField, Partials } = require("discord.js");
const { CommandKit } = require("commandkit");
const mongoDB = require("./database/connect");

const devGuild = process.env.DEV_GUILDS.split(", ");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
  ],
});

new CommandKit({
  client,
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
  bulkRegister: true,
  devGuildIds: devGuild,
  devRoleIds: ["1352893592556802049"],
});

mongoDB();

client.login(process.env.TOKEN);
