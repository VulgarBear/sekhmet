const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { queryOllama } = require('../../util/query/ollama')
const logger = require('../../util/client/logger')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Prompt the AI chatbot for a response')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('What will your prompt be?')
        .setRequired(true)
        .setMaxLength(256)
    ),

  run: async ({ interaction, client, handler }) => {
    const chatPrompt = interaction.options.getString('prompt')

    try {
      await interaction.deferReply()
      const response = await queryOllama(chatPrompt)

      if (response === undefined) {
        logger.error('Response is undefined')
        interaction.reply({ content: 'The AI response was empty. Please try again.', ephemeral: true })
        return
      }

      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setTitle(chatPrompt)
        .setDescription(`${response}`)

      await interaction.editReply({ embeds: [embed] })
    } catch (err) {
      logger.error('Error:', err)
      interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true })
    }
  },

  options: {
    devOnly: false,
    cooldown: '10s',
    isActive: true,
    dm_permission: false
  }
}
