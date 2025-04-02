const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const logger = require("../../util/client/logger");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scry")
    .setDescription("Search for an scry")
    .addStringOption((option) =>
      option
        .setName("card")
        .setDescription("Search ScryFall for a card?")
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    // Set args
    const card = await interaction.options.getString("card");

    try {
      const scryData = await funHelper.scryfall(card);

      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setTitle(scryData.name)
        .setURL(`${scryData.scryfall_uri}`)
        .addFields(
          { name: "Type:", value: scryData.type_line, inline: true },
          { name: "Mana Cost", value: scryData.mana_cost, inline: true },
          { name: "Buy This Card", value: scryData.purchase_uris.tcgplayer }
        )
        .setFooter({
          text: "API Source ScryFall.com",
          iconURL: "https://ohthe.vulgarity.xyz/scryfall-zMB5ArusycgI.jpeg",
        })
        .setThumbnail(scryData.image_uris.normal);

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
