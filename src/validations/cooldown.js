const cooldowns = require("../cooldowns-cache");
const { MessageFlags } = require("discord.js");

module.exports = ({ interaction, commandObj, handler }) => {
  if (cooldowns.has(`${interaction.user.id}-${commandObj.data.name}`)) {
    interaction.reply({
      content:
        "You're on cooldown, please wait some time before running this command again.",
      flags: MessageFlags.Ephemeral,
    });

    return true; // This is important
  }
};
