
const Discord = require("discord.js");

exports.run = (client, message, args, member) => {
  var sayi = args.slice(0).join(" ");
  if (!sayi)
    return message.channel.send(
      "**Kaç Mesaj Silmem Gerekiyor / ` Örn : .sil <0-100>`**"
    );
  message.channel.bulkDelete(sayi);
  message.channel
    .send(
      `**Söyledin Gibi ${sayi} Adet Mesajı Bu Odadan Kaldırdım**`
    )
    .then(msg => msg.delete(3000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mesajsil", "tz", "sil"],
  permLevel: 3
};

exports.help = {
  name: "temizle ",
  description: "Söylediğiniz Mesaj Kadar Temizler",
  usage: "temizle <sayı>"
};