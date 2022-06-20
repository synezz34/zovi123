const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')
exports.run = (client, message, args, member) => {
const yardım = new Discord.MessageEmbed()
  .setAuthor(`Cano`, client.user.avatarURL())
  .setColor("RED")
  .setThumbnail(client.user.avatarURL())
  .setDescription("!avatar @kişi : Belirtilen Kişinin Profil Fotoğrafını Atar \n !saat : Anlık Saati Gösterir \n !sil (mesajsayısı) : Belirtilen Mesaj Sayısı Kadar Mesaj Siler \n !sa-as aç/kapat : SA-AS Sistemini Açar/Kapatır")
  .addField("!sil\n!mod-log\n!küfür-engel" , "Zivo")
  .setImage("https://media2.giphy.com/media/62PP2yEIAZF6g/giphy.gif?cid=ecf05e47rfr2mhz1ty09z60hwxy1hujy4nv3ko8y3zm72pwu&rid=giphy.gif&ct")
.setFooter("Yardım Menüsü", message.author.avatarURL())//resim link
.setTimestamp()
  message.channel.send(yardım)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["y", "help", "h"],
    permLevel: 0
}

exports.help = {
    name: "yardım",
    description: "",
    usage: ""
}