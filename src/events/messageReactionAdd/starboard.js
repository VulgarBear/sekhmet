const { Events, EmbedBuilder } = require('discord.js')
const starboard = require('../../database/models/starboardSchema')

const { client } = require('../../sekhmet')

module.exports = async (reaction, user, client, CommandKit) => {
  if (!reaction.message.guildId) return

  const data = await starboard.findOne({ Guild: reaction.message.guildId })
  if (!data) return
  else {
    if (reaction._emoji.name !== '⭐') return // Added return

    const guild = await CommandKit.guilds.cache.get(reaction.message.guildId)
    // const guild = await client.guilds.fetch(reaction.message.guildId);
    const sendChannel = await guild.channels.fetch(data.Channel)
    const channel = await guild.channels.fetch(reaction.message.channelId)
    const message = await channel.messages.fetch(reaction.message.id)

    if (message.author.id == CommandKit.user.id) return

    const newReaction = await message.reactions.cache.find(
      (reaction) => reaction.emoji.id === reaction._emoji.id
    )

    if (newReaction.count >= data.Count) {
      const msg = message.content || 'No content available'

      const embed = new EmbedBuilder()
        .setColor(process.env.EMBED)
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`
        })
        .setDescription(
          `${msg} \n\n[**Click to jump to message!**](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channelId}/${reaction.message.id})`
        )
        .setTimestamp()

      await sendChannel
        .send({
          content: `**⭐ ${newReaction.count} | ${channel}**`,
          embeds: [embed]
        })
        .then(async (m) => {
          await m.react('⭐').catch((err) => {})
        })
    }
  }
}
