const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    let tag = "Bia"; // tagınız
    let sunucu = "760830115676160031"; //sunucu ID
    
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "emoji ismi");
  const arvelosembed = new Discord.RichEmbed()
  .setDescription(" **Sunucu İstatistikleri** ")
  .addField("<a:wendy_tac:760944293765578804>  **Sunucuda Bulunan Üye Sayısı** ",message.guild.memberCount)
    .addField("<a:wendy_2:760943185425072219>  **Sunucudaki Aktif Üye Sayısı** ",message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
    .addField("<a:wendy_2:760943185425072219>  **Ses Kanallarında Bulunan Üye Sayısı** ", `${count}`)
    .addField("<a:wendy_2:760943185425072219>  **Tagımızı Alan Üye Sayısı** ",
      message.guild.members.filter(m => m.user.username.includes("Bia")).size
    ) 
    .setFooter(client.user.username, message.guild.iconURL);
  message.channel.sendEmbed(arvelosembed)
    message.react(emoji)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'sunucuyu sayar.',
  usage: 'say'

};