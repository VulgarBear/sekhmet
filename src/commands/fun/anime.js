const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const logger = require("../../util/client/logger");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Search for an anime")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("What anime would you like to search for?")
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    // Set args
    const titleName = await interaction.options.getString("title");

    try {
      const animeData = await funHelper.kitsu("anime", titleName);

      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setTitle(
          animeData.attributes.titles.en +
            " | " +
            animeData.attributes.titles.ja_jp
        )
        .setURL(`https://kitsu.io/anime/${animeData.attributes.slug}`)
        .setDescription(
          `**Synopsis:**\n${animeData.attributes.synopsis.substring(0, 450)}...`
        )
        .setFooter({
          text: "API Source Kitsu.io",
          iconURL: "https://ohthe.vulgarity.xyz/kitsu-OVH0YMOe4aDB.png",
        })
        .setThumbnail(animeData.attributes.posterImage.small);

      interaction.reply({ embeds: [embed] });
    } catch (err) {
      interaction.reply(
        `<:Crossmark:1355452870488752262> Looks like something went wrong, try again.`
      );
      logger.error(err);
    }
  },

  options: {
    devOnly: false,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
  },
};
