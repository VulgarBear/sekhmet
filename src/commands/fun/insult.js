const { SlashCommandBuilder } = require("discord.js");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insult")
    .setDescription("Insult another member for fun")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who would you like to insult?")
        .setRequired(true)
    ),

  run: async ({ interaction, client, handler }) => {
    // Set args
    const insultUser = await interaction.options.getUser("user");
    const insultResult = await funHelper.insult();

    interaction.reply(`${insultUser} ` + insultResult);
  },

  options: {
    devOnly: false,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
  },
};
