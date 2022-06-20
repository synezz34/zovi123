const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`);
  console.error("---");

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

let prefix = ayarlar.prefix;
  




console.log("Zivo");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Komut Var Ulan `);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**");
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//////sa-as başlangıç//////
client.on('message', message => {
  let sistem = db.fetch(`saas_${message.guild.id}`)

  var sa = ["Sa","SA","sa","Sea","sea","SEA","selamın aleyküm","Selamın Aleyküm","SELAMIN ALEYKÜm","selamun aleyküm","Selamun Aleyküm","SELAMUN ALEYKÜM"]

  if(sistem === 'acik'){
    if(sa.includes(message.content.toLowerCase())){
      message.channel.send(` **Aleyküm Selam , Hoşgeldin.**`)
    }
  } else {
    return;
  }
})

/////////sa-as son///////

////////////////////////
client.on('message', msg => {

if (!msg.content.startsWith(prefix)) {
    return;
  }

  });



client.login(ayarlar.token);

//Küfür Engel Baş

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Heey! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", async msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Yakaladım Seni! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//Küfür Engel Son

//MODLOG BAŞ

client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`modlog${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`modlog${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`modlog${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`modlog${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.cache.get(db.fetch(`modlog${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`modlog${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                   .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`modlog${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`modlog${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`modlog${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {

  if (db.has(`modlog${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.cache.get(db.fetch(`modlog${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.MessageEmbed()
    .setColor("Black")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.MessageEmbed()
    .setColor("Black")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});

//MODLOG SON

//sa-as

client.on('message', message => {
  let sistem = db.fetch(`saas_${message.guild.id}`)

  var sa = ["Sa","SA","sa","Sea","sea","SEA","selamın aleyküm","Selamın Aleyküm","SELAMIN ALEYKÜm","selamun aleyküm","Selamun Aleyküm","SELAMUN ALEYKÜM"]

  if(sistem === 'acik'){
    if(sa.includes(message.content.toLowerCase())){
      message.channel.send(` **Aleyküm Selam , Hoşgeldin.**`)
    }
  } else {
    return;
  }
})
//sa-as son


//ticket destek şeysi

{
  const csri = "YETKİLİ İD GİRİN"
  
  const cdb = require("croxydb")
  require("discord-buttons")(client)
  const disbut = require("discord-buttons")
  client.on("clickButton", async button => {
  
  
  const evet = new disbut.MessageButton()
  .setStyle("green")
  .setLabel("Evet")
  .setID("Evet");
  const hayır = new disbut.MessageButton()
  .setStyle("red")
  .setLabel("Hayır")
  .setID("Hayır");
  const geriyükle = new disbut.MessageButton()
  .setStyle("green")
  .setLabel("Geri Yükle")
  .setID("GeriYükle");
  const sil = new disbut.MessageButton()
  .setStyle("red")
  .setLabel("Desteği Kapat")
  .setID("DesteğiKapat");
  const kilit = new disbut.MessageButton()
  .setStyle("grey")
  .setLabel("Kapat")
  .setEmoji("🔒")
  .setID("Kilit");
  
  
  
  let member = button.guild.members.cache.get(button.clicker.user.id)
  let kanal  = button.guild.channels.cache.get(button.channel.id)
  let data   = await cdb.get(`destekkullanıcı_${member.id}`);
  let data2  = await cdb.get(`destekkanal_${kanal.id}`);
  let user   = button.guild.members.cache.get(data2);
  
  
  
  
  if(button.id === "ticket"){
  if(data) return button.reply.send(">❌ **Başarısız!** Zaten aktif destek talebiniz bulunuyor. **Kanal:** <#" + data +">", true);
  
  button.reply.think(true).then(async a => {
    if(!button.guild.channels.cache.find(c => c.name === "Destek Sistemi")){
  button.guild.channels.create('Destek Sistemi' , {type: 'category'})
    }
    setTimeout(() => {
      const csk = button.guild.channels.cache.find(c => c.name === "Destek Sistemi")
  button.guild.channels.create('destek-' + member.user.username , { type: 'text', reason: 'Destek '+ member.user.tag }).then(async c => {
  c.setParent(csk.id);
  
  await cdb.set(`destekkanal_${c.id}`, member.id);
  await cdb.set(`destekkullanıcı_${member.id}`, c.id);
  
            let role = button.guild.roles.cache.find(a => a.name === '@everyone')      
            await c.createOverwrite(role.id, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
              });
    
            await c.createOverwrite(csri, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
              });
    
            await c.createOverwrite(member.id, {  
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
              })
  
  a.edit("> ✅ **Başarılı!** Destek talebiniz oluşturuldu. **Kanal:** <#" + c.id +">")
  await c.send(`${member.user}, **Destek ekibimiz birazdan burda olur sakın endişelenme! sorununu hemen çözeceklerine inanıyorum :)** <@&`+csri+">", kilit)
  })
    }, 2000)
  })
  } else {
  
  
  
  
  
  
  if(button.id === "Kilit"){
  button.message.edit(`> **Dikkat!** Destek talebini kapatmak istediğine emin misin?`,{
  buttons: [evet, hayır]
  })
  
  button.reply.defer()
  } else {
  
  
  
  if(button.id === "Evet"){
  
   await kanal.createOverwrite(user, {  
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
              })
  
  await button.message.delete()
  await button.channel.send("> **Kapalı!** <@" + member + `> Tarafından destek talebi kapatıldı.`,{
  buttons: [geriyükle, sil]
  })
  
  await kanal.setName("kapalı-"+ user.user.username)
  
  button.reply.defer()
  } else {
  
  
  
  if(button.id === "GeriYükle"){
    await await kanal.setName("destek-"+ user.user.username)
            await kanal.createOverwrite(user, {  
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
              })
  
  await button.channel.send("> **Dikkat!** <@" + user + `> Destek talebi tekrar açıldı.`,{
  buttons: [kilit]
  })
  
  await button.message.delete()
  button.reply.defer()
  } else {
  
  
  
  if(button.id === "DesteğiKapat"){
  await cdb.delete(`destekkanal_${kanal.id}`);
  await cdb.delete(`destekkullanıcı_${user.id}`);
  
  button.channel.delete()
  button.reply.defer()
  } else {
  
  
  
  if(button.id === "Hayır"){
  button.message.edit("<@" + user + `> **Destek ekibimiz seninle ilgilenecek biraz sabırlı ol.**\n @everyone - @here`,  kilit)
  
  button.reply.defer()
  } else {
  }}}}}
  }
  
  
  }); 
  
  client.on("guildMemberRemove", async member => {
  
  
  let data   = await cdb.get(`destekkullanıcı_${member.id}`);
  let data2  = await cdb.get(`destekkanal_${data}`);
  let kanal  = member.guild.channels.cache.get(data)
  
  
  if(!data) return;
  
  
  await cdb.delete(`destekkanal_${data.id}`);
  await cdb.delete(`destekkullanıcı_${member.id}`);
  
  kanal.delete()
  
  
  })
  client.on("channelDelete", async channel => {
  
  
  let data  = await cdb.get(`destekkanal_${channel.id}`);
  let data2   = await cdb.get(`destekkullanıcı_${data}`);
  
  
  if(!data) return;
  
  
  await cdb.delete(`destekkanal_${channel.id}`);
  await cdb.delete(`destekkullanıcı_${data}`);
  
  
  
  })
  }