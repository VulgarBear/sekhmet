const {
  ModalBuilder,
  EmbedBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const logger = require("../../util/client/logger");

module.exports = {
  data: {
    name: "feedback",
    description: "Give feedback on Sekhmet!",
  },

  run: async ({ interaction, client }) => {
    
    /* This block of code is responsible for fetching the feedback channel where the feedback provided
    by users will be sent.*/
    const feedbackChannelId = process.env.FEEDBACK_ID;
    logger.info(`Attempting to fetch feedback channel with ID: ${feedbackChannelId}`);

    const feedbackChannel = client.channels.cache.get(feedbackChannelId) || 
                          await client.channels.fetch(feedbackChannelId).catch(e => null);

    if (!feedbackChannel) {
      logger.error(`Failed to find feedback channel. Channel ID: ${feedbackChannelId}`);
      logger.error(`Available channels in cache: ${Array.from(client.channels.cache.keys()).join(', ')}`);
      return interaction.reply({
        content: "Unable to find feedback channel. <:nugget_mummy:1355453397133955142>",
        ephemeral: true,
      });
    }

    const modal = new ModalBuilder({
      customId: `myModal-${interaction.user.id}`,
      title: "Sekhmet Suggestion or Feedback",
    });

    const botInput = new TextInputBuilder({
      customId: "suggestInput",
      label: "Please provide your feedback",
      style: TextInputStyle.Paragraph,
    });

    // Action row is only permitted to hold one text input
    const firstActionRow = new ActionRowBuilder().addComponents(botInput);

    // Add inputs to modal
    modal.addComponents(firstActionRow);

    // Show user modal
    await interaction.showModal(modal);

    const filter = (interaction) =>
      interaction.customId === `myModal-${interaction.user.id}`;

    interaction
      .awaitModalSubmit({ filter, time: 60000 })
      .then((modalInteraction) => {
        const suggestValue =
          modalInteraction.fields.getTextInputValue("suggestInput");

        const embed = new EmbedBuilder()
          .setColor(process.env.EMBED)
          .setTitle("Make a suggestion for Sekhmet")
          .setDescription(`${suggestValue}`)
          .setTimestamp()
          .setFooter({
            text: `Suggested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          });

        // Send result to feedback channel
        feedbackChannel.send({ embeds: [embed] });

        // Positive Response for User
        modalInteraction.reply({
          content:
            "Thank you for the suggestion, have a dino nuggie! <:dinonuggie:1355454026409443360>",
          ephemeral: true,
        });
      })
      .catch((err) => {
        logger.error(err);
        interaction.followUp({
          content:
            "Sorry there was an error, please try again <:nugget_mummy:1355453397133955142>",
          ephemeral: true,
        });
      });
  },

  options: {
    devOnly: false,
    cooldown: "10m",
    isActive: true,
    dm_permission: false,
  },
};
