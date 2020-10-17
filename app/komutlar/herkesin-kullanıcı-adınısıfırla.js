const Discord = require('discord.js');

exports.run = async (client, message, args) => {
   //f (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Yetkin yok')
   let tag = args[0]
  //f (!tag) return message.channel.send('<a:hata:607322381526237184> Hata : Bir tag adı yazmalısın.');
  
  message.channel.sendMessage("<a:onay:607322430704451625> Herkezın  adını sıfırlamak istermisin ?  Eğer eminsen `onay` yaz")
.then(() => {
  
  
message.channel.awaitMessages(a => a.author.id === message.author.id && a.content === "onay", {
    
    max: 1,
    time: 25000,
    errors: ['time'],
  })
    
  .then((collected) => {

  
  message.channel.send("<a:onay:607322430704451625> Başarıyla herkezın adını sıfırladım." )
   
   message.guild.members.forEach(u => {
u.setNickname("")
})
  })
     .catch(() => {
      message.channel.sendMessage("<a:hata:607322381526237184> Hata : Cevap vermedin için işlem iptal edildi");
    });
  
  })

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['herkesin-ad-sifirla'],
    permLevel: 3
}

exports.help = {
    name: 'h-ad-sifirla',
    description: '.',
    usage: 'herkesin adini degisir'
}