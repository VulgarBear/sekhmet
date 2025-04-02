const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const defaultRole = require("../../database/models/defaultRoleSchema");
const serverLog = require("../../database/models/logSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accept")
    .setDescription("You confirm that you accept the server rules."),

  run: async ({ interaction, client }) => {
    const dataRole = await defaultRole.findOne({
      Guild: interaction.guild.id,
    });

    const channelData = await serverLog.findOne({
      Guild: interaction.guild.id,
    });

    const givenRole = await interaction.guild.roles.fetch(dataRole.Role);
    const sendChannel = await interaction.guild.channels.fetch(
      channelData.Channel
    );

    // Create Embed
    const embed = new EmbedBuilder()
      .setTitle("Rule Acceptance")
      .setColor(process.env.EMBED)
      .setDescription(
        `<@${interaction.user.id}> (${interaction.user.globalName}) has accepted the server rules.`
      )
      .setTimestamp();

    // Add Role to the user
    await interaction.member.roles.add(givenRole);

    // Send message to user
    interaction.reply({
      content: `Thank you, ${givenRole} role has been added to your user.`,
      ephemeral: true,
    });

    // Send message to log channel
    await sendChannel.send({ embeds: [embed] });
  },

  options: {
    devOnly: true,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
    botPermissions: ["ManageRoles"],
  },
};
