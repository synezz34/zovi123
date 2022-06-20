const Discord = require("discord.js");
const data = require("quick.db");

exports.run = async (client, message, args) => {
   
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu Komutu Kullanmak İçin Gerekli Yetkiye Sahip Değilsin.'));
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('Lütfen Silinecek Mesaj Sayısı Gir!'));
    if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setDescription(' **100** Üzeri Mesaj Silinemez!'));
    message.channel.bulkDelete(args[0]);
    return message.channel.send(new Discord.MessageEmbed().setDescription(' '+`${args[0]}`+' Adet Mesaj Başarıyla Silindi!')).then(m => m.delete({timeout: 5000}));
    };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["temizle"],
    permLevel: 0
}

exports.help = {
    name: "sil",
    description: "mesaj silmeye yarar"
}