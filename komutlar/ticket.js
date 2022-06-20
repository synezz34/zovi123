const Discord = require('discord.js');
  const db = require("croxydb")
  const disbut = require("discord-buttons");

  exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ **Gerekli yetkiye sahip değilsin!!**")

const buton = new disbut.MessageButton()
.setStyle("blurple")//elleme
.setEmoji("☑️")//buton emojisi
.setID("ticket")

message.channel.send("**Destek Talebi Oluşturmak İçin Butona Tıkla!** ", buton) //chat mesaj

  }

  exports.conf = {
    aliases: []
   }

  exports.help = {
    name: 'ticket'
   }