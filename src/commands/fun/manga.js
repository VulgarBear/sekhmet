const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const logger = require('../../util/client/logger')
const funHelper = require('../../util/query/funHelper')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('manga')
    .setDescription('Search for an manga')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('What manga would you like to search for?')
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    // Set args
    const titleName = await interaction.options.getString('title')

    try {
      const mangaData = await funHelper.kitsu('manga', titleName)

      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setTitle(
          mangaData.attributes.titles.en_us +
            ' | ' +
            mangaData.attributes.titles.ja_jp
        )
        .setURL(`https://kitsu.io/manga/${mangaData.attributes.slug}`)
        .setDescription(
          `**Synopsis:**\n${mangaData.attributes.synopsis.substring(0, 450)}...`
        )
        .setFooter({
          text: 'API Source Kitsu.io',
          iconURL: 'https://ohthe.vulgarity.xyz/kitsu-OVH0YMOe4aDB.png'
        })
        .setThumbnail(mangaData.attributes.posterImage.small)

      interaction.reply({ embeds: [embed] })
    } catch (err) {
      interaction.reply(
        '<:Crossmark:1355452870488752262> Looks like something went wrong, try again.'
      )
      logger.error(err)
    }
  },

  options: {
    devOnly: false,
    cooldown: '5s',
    isActive: true,
    dm_permission: false
  }
}
