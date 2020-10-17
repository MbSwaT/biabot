exports.run = async (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!message.member.voiceChannel) { return message.channel.send("Ses kanalında olman lazım bu komutu yazarken kanka"); }

  const permissions = message.member.voiceChannel.permissionsFor(message.guild.me);
  if (permissions.has("CONNECT") === false) { return message.channel.send("Odaya girmek için yetkim yok aw"); }
  message.member.voiceChannel.join();
  return message.channel.send("Artık yargı dağıtmak için hazırım!");
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ['katıl'],
  permLevel: 1,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "gir",
  description: "Bulunduğunuz odaya giriş yapar",
  usage: "gir",
  usageDelim: "",
};