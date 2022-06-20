const Discord = require(`discord.js`)

exports.run = async(client, message)=> {

    const embed = new Discord.MessageEmbed()
    .setDescription("Saat Aşağıda Yazmaktadır")
    .setTimestamp()
    .setColor("BLUE")
    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["zaman","vakit"],
    permLevel: 0
}

exports.help = {
    name: "saat",
}