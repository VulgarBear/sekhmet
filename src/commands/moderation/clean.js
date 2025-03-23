const { SlashCommandBuilder } = require("discord.js");
const logger = require("../../util/client/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Cleans/deletes up to 100 messages.")
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete (1-100).")
        .setRequired(true)
    ),

  run: async ({ interaction, client, handler }) => {
    // Set args
    const amount = interaction.options.getString("amount");

    // Set hard limit for amount of messages
    if (amount > 100) {
      interaction.reply({
        content: "Unable to delete over 100 messages at one time.",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      // Get deleted messages
      try {
        const { size } = await interaction.channel.bulkDelete(amount);
        await interaction.reply({
          content: `Deleted ${size} messages.`,
          flags: MessageFlags.Ephemeral,
        });
      } catch (err) {
        logger.error(err);
        logger.error(err, "Purge call command failed to run.");
        interaction.reply({
          content:
            "An error occured, please make sure there are no messages over 14 days old included.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },

  options: {
    dm_permission: false,
    userPermissions: ["ManageMessages"],
    botPermissions: ["ManageMessages"],
  },
};
