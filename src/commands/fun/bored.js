const logger = require("../../util/client/logger");
const funHelper = require("../../util/query/funHelper");

module.exports = {
  data: {
    name: "bored",
    description: "Ideas for what to do when your bored",
    dm_permission: false,
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
        flags: MessageFlags.Ephemeral,
      });
      logger.error(err);
    }
  },
};
