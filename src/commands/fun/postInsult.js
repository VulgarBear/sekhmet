const { SlashCommandBuilder } = require("discord.js");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("post-insult")
    .setDescription("Add a insult to the grand list.")
    .addStringOption((option) =>
      option
        .setName("insult")
        .setDescription("What is your insult?")
        .setRequired(true)
    ),

  run: async ({ interaction, client, handler }) => {
    // Set args
    const insult = await interaction.options.getString("insult");
    const insultString = insult.toString();

    const insultAuthor = await interaction.user.username;
    const insultAuthorString = insultAuthor.toString();

    const insultResult = await funHelper.insultPost(
      insultString,
      insultAuthorString
    );

    interaction.reply({
      content: "Your insult has been added to the collection, thank you.",
      ephemeral: true,
    });
  },

  options: {
    devOnly: true,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
  },
};
