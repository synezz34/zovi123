const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = (client, message, args) => {
        if(args[0] === "aç"){
            db.set(`saas_${message.guild.id}`, 'acik')

            const asreaper = new Discord.MessageEmbed()
            .setDescription(`Sistem Aktif!`)
            .setColor('BLUE')
            message.channel.send(asreaper)
        }
        
        if(args[0] === "kapat"){
            db.delete(`saas-_${message.guild.id}`)

            const asreaper = new Discord.MessageEmbed()
            .setDescription(`Sistem Devre Dışı!`)
            .setColor('RED')
            message.channel.send(asreaper)
        }
    } 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['SA-AS',"Sa-as"],
    permLevel: 0
}

exports.help = {
    name: 'sa-as'
}