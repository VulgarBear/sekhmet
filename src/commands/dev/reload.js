const { ReloadType } = require("commandkit");
const { Events } = require("discord.js");
const logger = require("../../util/client/logger");

module.exports = {
  data: {
    name: "reload",
    description: "Reloads all Commands",
  },

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });

    await handler.reloadCommands();
    await handler.reloadEvents();
    await handler.reloadValidations();

    interaction.followUp({ content: "All Reloaded", ephemeral: true });

    // Log command usage
    const date = new Date();
    const dateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const user = interaction.user.tag;
    const interactionId = interaction.commandName;

    logger.info(`[${dateTime}] User: ${user} | Interaction: ${interactionId}`);
  },
  options: {
    devOnly: true,
  },
};
