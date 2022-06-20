const Discord = require('discord.js') //Botclub ❤️ Bay İlbeycik
exports.run = async (client, message, args) => { 
let ping = client.ws.ping
let color;
if (0 < ping < 100) color = 'GREEN'
if (100 < ping < 250) color = 'YELLOW'
if (ping > 250) color = 'RED'
let bayilbeycik = new Discord.MessageEmbed()
.setDescription(`İşte Api Gecikmem | ${ping}`)
.setTimestamp()
.setFooter(`BOT İSMİ | `)
.setColor(color)
message.reply({ embeds: [bayilbeycik]})
};
//Zelvos ❤️ Botclub
//Her Zaman En İyisi = Bay İlbeycik /Zivo :D
exports.conf = {
  enabled: true,
  aliases: ['gecikme'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'ping',
  description: '',
  usage: '',
  examples: ''
};