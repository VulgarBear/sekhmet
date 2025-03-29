const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eightball")
    .setDescription("Ask the eightball a question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What question would you like to ask?")
        .setRequired(true)
    ),

  run: async ({ interaction, client, handler }) => {
    // Set args
    const question = interaction.options.getString("question");
    const answer = await funHelper.eightBall();

    const questionEmbed = new EmbedBuilder()
      .setColor(process.env.EMBED)
      .setTitle("The Magic 8-Ball")
      .addFields(
        { name: "Question Asked:", value: question },
        { name: "Your Answer:", value: answer }
      );

    interaction.reply({ embeds: [questionEmbed] });
  },

  options: {
    devOnly: false,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
  },
};
