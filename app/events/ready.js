//READY.JS YE ATILACAK

const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("dnd");
   var oyun = [
        "❤️Bia❤️",
        "#2014",
        "❤️Bia❤️",  
        "Bia Backup",
        "#2014",
        "❤️Bia❤️",
        "❤️Bia❤️"
    ];
    setInterval(function() {
        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setGame(oyun[random], "https://rapp");
        }, 2 * 2500);
}