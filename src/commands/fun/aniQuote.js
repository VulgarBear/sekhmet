const { EmbedBuilder } = require("discord.js");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: {
    name: "anime_quote",
    description: "Request an anime quote",
    dm_permission: false,
  },

  run: async ({ interaction }) => {
    const animeInfo = await funHelper.aniQuote();
    const animeTitle = animeInfo.data.anime.name;
    const animeQuote = animeInfo.data.content;
    const animeCharacter = animeInfo.data.character.name;

    // Build Embed
    const aniQuoteEmbed = new EmbedBuilder()
      .setColor(process.env.EMBED)
      .setTitle(`${animeCharacter} from ${animeTitle}`)
      .setDescription(animeQuote);

    interaction.reply({ embeds: [aniQuoteEmbed] });
  },

  options: {
    devOnly: false,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
  },
};
