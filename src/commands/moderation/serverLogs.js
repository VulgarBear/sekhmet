const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const serverlog = require('../../database/models/logSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server-logs')
    .setDescription('Server log system commands')
    .addSubcommand((command) =>
      command
        .setName('setup')
        .setDescription('Setup the server log system')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('What channel should server logs go to?')
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName('disable').setDescription('Disable the server log')
    )
    .addSubcommand((command) =>
      command
        .setName('check')
        .setDescription('Check the server log system status')
    ),

  run: async ({ interaction }) => {
    // Set args
    const { options } = interaction
    const sub = options.getSubcommand()

    // Create Embed & Send
    async function sendMessage (message) {
      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setDescription(message)

      await interaction.reply({ embeds: [embed], ephemeral: true })
    }

    // Sub Commands
    const data = await serverlog.findOne({
      Guild: interaction.guild.id
    })

    switch (sub) {
      case 'setup': {
        if (data) {
          return await sendMessage(
            `<:Crossmark:1355452870488752262> Looks like the log system is already setup.. once a log is generated, it will be send in <#${data.Channel}>`
          )
        } else {
          const channel = options.getChannel('channel')

          await serverlog.create({
            Guild: interaction.guild.id,
            Channel: channel.id
          })

          await sendMessage(
            `<:Checkmark:1355452854114193439> Your log system is setup. Once a log is created, it will be send in ${channel}`
          )
        }
        break
      }
      case 'disable':
        {
          if (!data) {
            return await sendMessage(
              '<:Crossmark:1355452870488752262> Looks like there is no log system setup.'
            )
          } else {
            await serverlog.deleteOne({ Guild: interaction.guild.id })
            await sendMessage(
              '<:Checkmark:1355452854114193439> Your log system has been disabled'
            )
          }
        }
        break
      case 'check': {
        if (!data) {
          return await sendMessage(
            '<:Crossmark:1355452870488752262> Looks like there is no log system setup.'
          )
        } else {
          const string = `**Log Channel:** <#${data.Channel}>`
          await sendMessage(
            `<:Checkmark:1355452854114193439> **Your Log System** \n\n${string}`
          )
        }
        break
      }
    }
  },

  options: {
    devOnly: false,
    cooldown: '5s',
    isActive: true,
    dm_permission: false,
    userPermissions: ['ViewAuditLog'],
    botPermissions: ['ViewAuditLog']
  }
}
