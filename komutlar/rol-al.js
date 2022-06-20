const Discord = require("discord.js");
exports.run = (client, message, args) => {
  
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTimestamp()
      .addField("⚠ **Uyarı** ⚠", "`rol-al` **Adlı Komutu Özel Mesajlarda Kullanamazsın!**")
    return message.author.send(ozelmesajuyari);
  }
  
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("❌ Bu Komutu Kullana Bilmek için `Rolleri Yönet` Yetkisine Sahip Olmalısın!")

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user)return message.channel.send("**⚠ Kimeden Rol Alınacağını Yazmalısın!**")
  
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
  if (!rol) return message.channel.send("**⚠ Alınacak Rolü Yazmalısın!**")
  user.roles.remove(rol)

  const embed = new Discord.MessageEmbed()
    .setDescription(`✅ | Başarıyla ${user} İsimli Kullanıcıdan ${rol} İsimli Rol Alındı!`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setColor("BLUE")
    .setTimestamp();
  message.channel.send(embed)
}

exports.conf = {
  aliases: ["rolal", "ra"]
}

exports.help = {
  name: "rol al"
}