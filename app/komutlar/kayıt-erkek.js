const Discord = require("discord.js");
const db = require('quick.db');


exports.run = async (client, message, args) => {

    let role = message.guild.roles.get('765635924465680456')// erkek rol id
    let kayitsiz = message.guild.roles.get('765635931222441995')// Kayıtsız rol id
    let kayitci = message.guild.roles.get('')// Kayıtcı rol id
    let channel = message.guild.channels.get('765695012930584618') || message.channel// Log kanal id girin, boş bırakırsanız komutun kullanıldığı kanala logu yollar.

    if(!message.member.hasPermission(`ADMINISTRATOR`)) return;
// Sadece role sahip olanlar kullansın istiyorsanız 14. satır yerine:
//if(!message.member.roles.has(kayitci)) return;
  
if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
let isim = args[1];
if(!isim) return message.channel.send(`${args[0]}, için bir isim girmelisin.`)
if(isim.length > 16) return message.channel.send(`Daha kısa bir isim yaz.`)

let yaş = args[2];
if(!yaş) return message.channel.send(`${args[0]}, için bir isim gir.`)
if(yaş.length > 2) return message.channel.send(`Adam 100 yaşında değil ya?`)
  
const emb = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor(`#fffff0`)
.setFooter(`#${message.channel.name} Kanalında Kullanıldı.`)

message.guild.members.get(kullanıcı.id).setNickname(`${isim} | ${yaş}`)
message.guild.members.get(kullanıcı.id).addRole(role.id)
message.guild.members.get(kullanıcı.id).removeRole(kayitsiz.id)
message.guild.members.get(kullanıcı.id).send(emb.setDescription(`**${message.guild.name}** sunucusunda ${message.author} tarafından ${isim} | ${yaş} olarak kayıt edildin.`))

channel.send(
emb.setDescription(`${kullanıcı}, kullanıcısı kayıt edildi.`)
.addField(`Kayıt eden:`, message.author, true)
.addField(`Yeni ismi:`, args[1], true)
.addField(`Yeni yaşı:`, args[2], true)
.addField(`Verilen rol:`, role.name, true)
.addField(`Alınan rol:`, kayitsiz.name, true))
  
message.reply(`Kayıt işlemi başarılı  `)

// Çok isterseniz botun yolladığı mesaja tepki ekleyebilirsiniz.
// .then(m => m.react(``))

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
};//codare