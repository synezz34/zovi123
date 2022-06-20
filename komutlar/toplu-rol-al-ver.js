const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const prettyMilliseconds = require('pretty-ms');
const prefix = "m!"
exports.run = async (client, message, args) => {
    const error = (str) => message.channel.send(new Discord.MessageEmbed().setTitle('Hata ⚠️').setDescription(str));
    const yuzdeHesapla = (p1, p2) => {
        const yapilan = p2 - p1;
        return ((yapilan * 100) / p2).toFixed(2)
    };

    const yaklasikSure = (count) => {
        const toplamSure = 3000 * count;
        const tahminiSureIng = prettyMilliseconds(toplamSure);
        const tahminiSureTr = tahminiSureIng
            .replace(/s/g, ' saniye')
            .replace(/m/g, ' dakika')
            .replace(/h/g, ' saat')
            .replace(/ms/g, ' milisaniye');


        return tahminiSureTr;
    };

      if(message.author.id !== message.guild.owner.user.id) return message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`Bu sunucunun yedeğini alabilmeniz için **Sunucu Sahibi** Olmanız lazım!`)
            .addField('Sunucu Sahibi', message.guild.owner.user.tag)
            );
    const option = args[0];
    const options = ['al', 'ver'];
    try {
        switch (option) {
            case 'al':
  const removeFrom = message.guild.roles.cache.find(r => r.name === '@everyone')
    let removeRole = message.mentions.roles.first();   
              if (!removeRole) return error('Bir Rol Belirtmelisin.');

         if (removeRole.id == message.guild.id) return error('Kişilerden @everyone rolünü alamazsınız.');

                const removeFromFilter = removeFrom.members.filter(m => m.roles.cache.has(removeRole.id));
                const removeFromCount = removeFromFilter.size;
                if (removeFromCount == 0) return error('Bu rol zaten kimsede yok!')

                if (message.guild.me.roles.highest.position <= removeFrom.position || message.guild.me.roles.highest.position <= removeRole.position) return error(`Botun yetkisi yetmiyor. Beni ${removeRole} rollerinden daha yukarıya taşı.`)

                const onayEmbed = new Discord.MessageEmbed().setTitle('Onaylıyor musunuz?')
                    .setDescription(`
                    **${removeFrom} (${removeFromCount} kişi)** rolündeki kişilerden **${removeRole}** rolü silinecek.
                `).setFooter(`İşlemin yaklaşık ${yaklasikSure(removeFromCount)} sürerek bitmesi tahmin ediliyor.`);

                message.channel.send(onayEmbed).then(m => {
                    m.react('✅');
                    m.react('❌');
                    const emojies = ['✅', '❌'];
                    const filter = (reaction, user) => {
                        return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
                    };

                    const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
                    collector.on('collect', (reaction, user) => {
                        switch (reaction.emoji.name) {
                            case '✅':
                                m.reactions.removeAll();

                                const islemEmbed = new Discord.MessageEmbed()
                                    .setTitle('Toplu Rol Silme')

                                var islemYapilan = 1, kalanKisi = removeFromFilter.size;
                                removeFromFilter.forEach((member) => {
                                    const timeout = setTimeout(() => {
                                        member.roles.remove(removeRole);
                                        m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Silme').addField('Toplam Kaç Kişiden Silinecek', removeFromCount, true).addField('Kaç Kişi Kaldı', kalanKisi).addField('Yüzdelik', `İşlem Yapılan: %${yuzdeHesapla(kalanKisi, removeFromFilter.size)}`).setFooter(`yaklaşık ${yaklasikSure(kalanKisi)} süre kaldı`))
                                        clearTimeout(timeout)
                                        kalanKisi = kalanKisi - 1;
                                        if (kalanKisi == 0) {
                                            m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Silme').setDescription(`**İşlem tamamlandı!** **${removeFrom} (${removeFromCount} kişi)** rolündeki kişilerin hepsinden ${removeRole} rolü alındı.`))
                                        }
                                    }, islemYapilan * 3000);
                                    islemYapilan = islemYapilan + 1;
                                });

                                break;
                            case '❌':
                                m.reactions.removeAll();
                                m.edit(new Discord.MessageEmbed().setDescription(`İşlem kullanıcı isteğiyle iptal edildi.`));
                                break;
                        };
                    });

                    collector.on('end', collected => {
                        if (collected.size == 0) {
                            m.reactions.removeAll();
                            m.edit(new Discord.MessageEmbed().setDescription(`30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
                        }
                    })
                });
                break;
            case 'ver':
 let addTo = message.guild.roles.cache.find(r => r.name === '@everyone')
const addRole = message.mentions.roles.first(); 
                if (!addRole) return error('Bir Rol Belirtiniz');
                if (addRole.id == message.guild.id) return error('Üyelere @everyone rolünü veremezsiniz');
                const addToFilter = addTo.members.filter(m => !m.roles.cache.has(addRole.id));
                const addToCount = addToFilter.size;
                if (addToCount == 0) return error('Bu rol zaten tüm üyelerde var!')

                if (message.guild.me.roles.highest.position <= addTo.position || message.guild.me.roles.highest.position <= addRole.position) return error(`Botun yetkisi yetmiyor. Beni ${addRole} rollerinden daha yukarıya taşı.`)

                const onay1Embed = new Discord.MessageEmbed().setTitle('Onaylıyor musunuz?')
                    .setDescription(`
                    **${addTo} (${addToCount} kişi)** rolündeki kişilere **${addRole}** rolünü verecek.
                `).setFooter(`İşlemin yaklaşık ${yaklasikSure(addToCount)} sürerek bitmesi tahmin ediliyor.`);

                message.channel.send(onay1Embed).then(m => {
                    m.react('✅');
                    m.react('❌');
                    const emojies = ['✅', '❌'];
                    const filter = (reaction, user) => {
                        return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
                    };

                    const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
                    collector.on('collect', (reaction, user) => {
                        switch (reaction.emoji.name) {
                            case '✅':
                                m.reactions.removeAll();

                                const islemEmbed = new Discord.MessageEmbed()
                                    .setTitle('Toplu Rol Verme')


                                var islemYapilan = 1, kalanKisi = addToFilter.size;
                                addToFilter.forEach((member) => {
                                    const timeout = setTimeout(() => {
                                        member.roles.add(addRole);
                                        m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Verme').addField('Toplam Kaç Kişiye Verilecek', addToCount, true).addField('Kaç Kişi Kaldı', kalanKisi).addField('Yüzdelik', `İşlem Yapılan: %${yuzdeHesapla(kalanKisi, addToFilter.size)}`).setFooter(`yaklaşık ${yaklasikSure(kalanKisi)} süre kaldı`))
                                        clearTimeout(timeout)
                                        kalanKisi = kalanKisi - 1;
                                        if (kalanKisi == 0) {
                                            m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Verme').setDescription(`**İşlem tamamlandı!** **${addTo} (${addToCount} kişi)** rolündeki kişilerin hepsine ${addRole} rolü verildi.`))
                                        }
                                    }, islemYapilan * 3000);
                                    islemYapilan = islemYapilan + 1;
                                });

                                break;
                            case '❌':
                                m.reactions.removeAll();
                                m.edit(new Discord.MessageEmbed().setDescription(`İşlem kullanıcı isteğiyle iptal edildi.`));
                                break;
                        };
                    });

                    collector.on('end', collected => {
                        if (collected.size == 0) {
                            m.reactions.removeAll();
                            m.edit(new Discord.MessageEmbed().setDescription(`30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
                        }
                    })
                });
                break;
            default:
                error(`**Lütfen Bir Opsiyon Belirtmelisin!!**
${prefix}toplu-rol ver @verilecekrol
${prefix}toplu-rol al @alınacakrol
\nNot: Rolleri Etiketlemeden Yazı Şeklinde Belirtmelisiniz
`);
        }
    } catch (err) {
        error('Bir hata oluştu..');
        console.error(err);
    };
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['trol', 'toplu-rol',"c-role"],
    permLevel: 4
};

exports.help = {
    name: 'toplurol',
    description: 'Toplu rol alıp verme sistemi, laura tarafından yapıldı.'
};