const { EmbedBuilder } = require("discord.js");

// Build Embed
const aboutEmbed = new EmbedBuilder()
  .setColor(process.env.EMBED)
  .setTitle("Learn about Sekhmet")
  .setDescription(
    `Sekhmet is  developed by Vulgarbear for use within The Talking Room community servers. \n
    She is built upon [discord.js](https://discord.js.org/) and [commandkit](https://commandkit.js.org/). More information can be found on the [github](https://github.com/VulgarBear/sekhmet). \n
    Join the development [community server](https://discord.gg/MzVg2Kdd9d) to learn more!`
  );

module.exports = {
  data: {
    name: "about",
    description: "General information about Sekhmet",
  },

  run: ({ interaction }) => {
    interaction.reply({ embeds: [aboutEmbed] });
  },

  options: {
    devOnly: false,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
  },
};
