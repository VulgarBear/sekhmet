const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const defaultRole = require('../../database/models/defaultRoleSchema')
const serverlog = require('../../database/models/logSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('default-role')
    .setDescription('Default role system commands')
    .addSubcommand((command) =>
      command
        .setName('setup')
        .setDescription('Setup the server default role system')
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription(
              'What role should be the default role for this server?'
            )
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName('disable').setDescription('Disable the default role.')
    )
    .addSubcommand((command) =>
      command
        .setName('check')
        .setDescription('Check the server default role status')
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
    const data = await defaultRole.findOne({
      Guild: interaction.guild.id
    })

    switch (sub) {
      case 'setup': {
        if (data) {
          return await sendMessage(
            '<:Crossmark:1355452870488752262> Looks like the default role is already setup.. once a user accepts they will gain the role.'
          )
        } else {
          const role = options.getRole('role')

          await defaultRole.create({
            Guild: interaction.guild.id,
            Role: role.id
          })

          await sendMessage(
            '<:Checkmark:1355452854114193439> Your default role is setup. Once a user accepts they will gain the role.'
          )
        }
        break
      }
      case 'disable':
        {
          if (!data) {
            return await sendMessage(
              '<:Crossmark:1355452870488752262> Looks like there is no default role setup.'
            )
          } else {
            await defaultRole.deleteOne({ Guild: interaction.guild.id })
            await sendMessage(
              '<:Checkmark:1355452854114193439> Your default role has been disabled'
            )
          }
        }
        break
      case 'check': {
        if (!data) {
          return await sendMessage(
            '<:Crossmark:1355452870488752262> Looks like there is default role setup.'
          )
        } else {
          const string = `**Default Role:** <@&${data.Role}>`
          await sendMessage(
            `<:Checkmark:1355452854114193439> **Your Default Role** \n\n${string}`
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
    userPermissions: ['ManageRoles'],
    botPermissions: ['ManageRoles']
  }
}
