const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: {
    name: 'stats',
    description: 'Information about how Sekhmet is running'
  },

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true })

    // Calculate ping
    const reply = await interaction.fetchReply()
    const ping = reply.createdTimestamp - interaction.createdTimestamp

    // Get uptime
    const uptime = process.uptime()
    const uptimeString = formatUptime(uptime)

    // Get memory usage
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024
    const memoryUsageString = `${Math.round(memoryUsage * 100) / 100} MB`

    // Get command response time (placeholder)
    const commandResponseTime = '100ms' // Placeholder value

    // Get bot owner
    const hardcodedOwnerId = '101808227385098240'
    const botOwner = client.users.cache.get(hardcodedOwnerId)
    const botOwnerMention = botOwner ? `<@${hardcodedOwnerId}>` : 'Unknown'

    // Generate random embed color
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')

    // Create embed
    const embed = new EmbedBuilder()
      .setTitle('Sekhmet Information')
      .setColor(process.env.EMBED)
      .setDescription(
        `**Client Latency:** ${ping}ms\n` +
          `**Uptime:** ${uptimeString}\n` +
          `**Memory Usage:** ${memoryUsageString}\n` +
          `**Command Response Time:** ${commandResponseTime}\n` +
          '**Websocket Latency:** Loading...\n' + // Placeholder for WebSocket ping
          `**Bot Owner:** ${botOwnerMention}`
      )

    // Send initial embed
    const sentMessage = await interaction.editReply({ embeds: [embed] })

    // Calculate WebSocket ping after sending the initial reply
    const websocketPing = client.ws.ping
    embed.setDescription(
      `**Client Latency:** ${ping}ms\n` +
        `**Uptime:** ${uptimeString}\n` +
        `**Memory Usage:** ${memoryUsageString}\n` +
        `**Command Response Time:** ${commandResponseTime}\n` +
        `**Websocket Latency:** ${websocketPing}ms\n` + // Update WebSocket ping
        `**Bot Owner:** ${botOwnerMention}`
    )

    // Edit the original reply with the updated embed
    await interaction.editReply({ embeds: [embed] }).catch(console.error)
  },

  options: {
    devOnly: false,
    cooldown: '5s',
    isActive: true,
    dm_permission: false
  }
}

// Function to format uptime
function formatUptime (uptime) {
  const days = Math.floor(uptime / 86400)
  const hours = Math.floor((uptime % 86400) / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)

  let uptimeString = ''
  if (days > 0) uptimeString += `${days}d `
  if (hours > 0) uptimeString += `${hours}h `
  if (minutes > 0) uptimeString += `${minutes}m `
  uptimeString += `${seconds}s`

  return uptimeString
}
