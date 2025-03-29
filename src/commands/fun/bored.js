const logger = require("../../util/client/logger");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: {
    name: "bored",
    description: "Ideas for what to do when your bored",
  },

  run: async ({ interaction }) => {
    const member = await interaction.guild.members.fetch(interaction.user.id);

    try {
      const boredData = await funHelper.bored();

      interaction.reply({
        content: `${member}, ` + boredData.toLowerCase(),
      });
    } catch (err) {
      interaction.reply({
        content: "Something went wrong!",
      });
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
