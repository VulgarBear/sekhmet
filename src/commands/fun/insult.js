const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const funHelper = require('../../util/query/funHelper')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('insult')
    .setDescription('Insult another member for fun')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('Who would you like to insult?')
        .setRequired(true)
    ),

  run: async ({ interaction, client, handler }) => {
    // Set args
    const insultUser = await interaction.options.getUser('user')
    const insultResult = await funHelper.insultGet()

    // Create Embed & Send
    const embed = new EmbedBuilder()
      .setColor(process.env.EMBED)
      .setTitle('A time honored tradition')
      .setDescription(`${insultUser}, ${insultResult.data[0].insult}.`)
      .setFooter({
        text: `Insult submitted by ${insultResult.data[0].author} (ID ${insultResult.data[0].id})`,
        ironURL: 'https://ohthe.vulgarity.xyz/middle_finger-ovwIYwJDKKgi.jpg'
      })

    interaction.reply({ embeds: [embed] })
  },

  options: {
    devOnly: false,
    cooldown: '5s',
    isActive: true,
    dm_permission: false
  }
}
