const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

//////

////

client.on('roleCreate', async (role, member) => {

 let sChannel = role.guild.channels.find(c => c.name === '')
    sChannel.send(`**Yeni Bir rol Eklendi ve Koruma Nedeni ile silindi,
Silinen Rol: **${role.name}**
`)
    .then(() => console.log(`${role.name} adlı rol silindi`))
    .catch(console.error); 
role.delete()

});

////


module.exports = async role => {
  const kanal = role.guild.channels.get("YAPILAN BİRŞEYLERİN GÖNDERECEGİ KANAL ID").id;
  if (!kanal) return;
  const guild = role.guild;
  const audit = await guild.fetchAuditLogs({ limit: 1 });
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
  const embed = await new Discord.RichEmbed()
        .setTitle('**Role Deleted**')
        .addField('Role', `@${role.name}\n\`${role.id}\``, true)
        .addField('Deleted by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
        .setFooter('Time of Action')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
 let log = role.guild.channels.find( channel => channel.name === "mod-log");
 log.send("<@"+entry.executor.id+"> isimli kullanici bir rolü sildi ve yetkilerini aldim.")
role.guild.members.get(entry.executor.id).roles.forEach(r => {
role.guild.members.get(entry.executor.id).removeRole(r)
console.log("rolleralindi")

})
};

////

client.on("channelDelete", async function(channel) {
if(channel.guild.id !== "sunucu id") return;/////CodePLUS/////
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
    if(logs.entries.first().executor.bot) return;
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("alıncak rol 1"))
              channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get("alıncak rol 2"))
    })
const sChannel = channel.guild.channels.find(c=> c.id ==="log kanal id")//kanalın id si yazılıcak
const cıks = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`${channel.name} adlı Kanal silindi Silen kişinin yetkilerini  çekiyom moruk çıkssss :tiks:`)
.setFooter('Kanal Koruma Sistemi')
channel.guild.owner.send(` **${channel.name}** adlı Kanal silindi Silen  kişinin yetkilerini aldım:tiks:`)
}) 

/////



client.login(ayarlar.token);
//giriş mesaj
client.on("guildMemberAdd", member => {  
  const kanal = "765635978953621504";let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
 
  var kontrol;
if (kurulus < 1296000000) kontrol = '<a:emoji_64:760948398836154450> **__Bu Hesap Güvenilir Değil__**  '
if (kurulus > 1296000000) kontrol = '<a:emoji_29:760924644840308768> **__Bu Hesap Güvenilir Gözüküyor__**'
  moment.locale("tr");
  let buse = client.channels.get(kanal);
buse.send("<a:wendy_tac:760944293765578804>**  Hoşgeldin! " + member + " Seninle __\`" + member.guild.memberCount + "\`__ Kişiyiz.**  \n\n<a:wendy_tac:760944293765578804>  **Müsait olduğunda Register Odalarından Birine Geçip Kaydını Yaptırabilirsin..**  \n\n<a:wendy_tac:760944293765578804>  <@&765901890797699102> **seninle ilgilenicektir.**\n\n<a:wendy_tac:760944293765578804>  Hesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("** YYYY __DD MMMM dddd (hh:mm:ss)__**") +  "  \n\n"  + kontrol + "   \n\n  \n\n", new Discord.Attachment("https://cdn.discordapp.com/attachments/765635978953621504/765706070739779589/ezgif-3-8fc27b8d6925.gif"
    )
  );
});  
//gif  

client.on(`userUpdate`, (oldUser, newUser) => {

 

  let kişi = client.users.get(oldUser.id)

  let avatar = kişi.avatarURL

  let kanal = client.channels.find(ch => ch.id === '759460287496585249')

 

  const emb = new Discord.RichEmbed()

  .setImage(avatar)

  .setFooter(`${kişi.tag}`)

  .setTimestamp()

  .setDescription(`Fotoğrafa gitmek için [tıkla](${kişi.avatarURL})!`)

  kanal.send(emb)

 

})

//ddos

client.on('message', msg => {

if(client.ping > 550) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "saldırı-koruma")

           sChannel.send(`⚠UYARI⚠\n \n🔸 Sunucunun Pingi Yükseldiğinden Dolayı Bölge Değiştirildi!\n🔸 Yeni Bölge: ${yenibölge} `+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log("🌍 Bölge:" + g.region))
           .then(g => msg.channel.send("✅ Bölge **"+ g.region  + " Olarak Değiştirildi! 🏡"))
           .then(msg.reply('✅ Bölge Değiştirildi! ')) 
           .catch(console.error);
}});

//afk 

client.on('message', async message => {
 
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let afkkullanıcıı = await db.fetch(`afk_${kullanıcı}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.member.setNickname(`${message.author.username}`);
      
      message.channel.send(`☀️ **<@${message.author.username}>** adlı kullanıcı artık **AFK** değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) {
      message.channel.send(`🌙 **<@${kullanıcı.id}>** adlı Kullanıcı **AFK**. | **SEBEB** : \`${sebep}\``);
          }
  }
});


client.on("message", async msg => {
  if (msg.content === "b!patlat") {
    await msg.channel.send(
      `    **Sunucu Gg  :)**`
    );
  }
});



client.on("message", async msg => {
  if (msg.content === "tag") {
    await msg.channel.send(
      `    Bia`
    );
  }
});



client.on("message", async msg => {
  if (msg.content === "Bia") {
    await msg.channel.send(
      `    ***Tagımızı al***`
    );
  }
});

