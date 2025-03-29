const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const starboard = require("../../database/models/starboardSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("starboard")
    .setDescription("Starboard system commands")
    .addSubcommand((command) =>
      command
        .setName("setup")
        .setDescription("Setup the starboard system")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("What channel should starred messages go to?")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("star-count")
            .setDescription("How many stars before a message is added.")
        )
    )
    .addSubcommand((command) =>
      command.setName("disable").setDescription("Disable the starboard system")
    )
    .addSubcommand((command) =>
      command
        .setName("check")
        .setDescription("Check the starboard system status")
    ),

  run: async ({ interaction }) => {
    // Set args
    const { options } = interaction;
    const sub = options.getSubcommand();

    // Create Embed & Send
    async function sendMessage(message) {
      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setDescription(message);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Sub Commands
    var data = await starboard.findOne({ Guild: interaction.guild.id });

    switch (sub) {
      case "setup": {
        if (data) {
          return await sendMessage(
            `<:Crossmark:1355452870488752262> Looks like the starboard system is already setup.. once a message gets \`${data.Count}\` ⭐'s, it will be send in <#${data.Channel}>`
          );
        } else {
          var channel = options.getChannel("channel");
          var count = options.getInteger("star-count") || 1;

          await starboard.create({
            Guild: interaction.guild.id,
            Channel: channel.id,
            Count: count,
          });

          await sendMessage(
            `<:Checkmark:1355452854114193439> Your starboard system is setup. Once a message gets \`${count}\` ⭐'s, it will be send in ${channel}`
          );
        }
        break;
      }
      case "disable":
        {
          if (!data) {
            return await sendMessage(
              `<:Crossmark:1355452870488752262> Looks like there is no starboard system setup.`
            );
          } else {
            await starboard.deleteOne({ Guild: interaction.guild.id });
            await sendMessage(
              `<:Checkmark:1355452854114193439> Your starboard system has been disabled`
            );
          }
        }
        break;
      case "check": {
        if (!data) {
          return await sendMessage(
            `<:Crossmark:1355452870488752262> Looks like there is no starboard system setup.`
          );
        } else {
          var string = `**Star Channel:** <#${data.Channel}> \n**Required Stars:** \`${data.Count}\``;
          await sendMessage(
            `<:Checkmark:1355452854114193439> **Your Starboard System** \n\n${string}`
          );
        }
        break;
      }
    }
  },

  options: {
    devOnly: false,
    cooldown: "5s",
    isActive: true,
    dm_permission: false,
    userPermissions: ["ManageMessages"],
    botPermissions: ["ManageMessages"],
  },
};
