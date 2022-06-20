const Discord = require(`discord.js`)

exports.run = async(client, message)=> {
  
  let user = message.mentions.users.first() || message.author
  if(user){

    const embed = new Discord.MessageEmbed()
   // .setAuthor("${user.tag} Adlı Kullanıcının Avatarı:")
    .setDescription(" Adli Kullanıcının Avatarı:")
    .setImage(user.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    .setColor("GREEN")
    .setFooter("Avatar")
    message.channel.send(embed)
  } else {
      const embed = new Discord.MessageEmbed()
      .setDescription("Adlı Kullanıcının Avatarı:")
      .setImage(message.author.avatarURL({dynamic:true}))
      .setTimestamp()
      .setColor("GREEN")
      .setFooter("Avatar")
      message.channel.send(embed)
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pp","profil"],
    permLevel: 0
}

exports.help = {
    name: "avatar",
}