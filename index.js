
const express = require("express");
const app = express();
const mcs = require('node-mcstatus');

const fs = require('fs');
const config = require('./config.json');

const discordToken = config.discordToken;
const minecraftHost = config.minecraftHost;
const minecraftPort = config.minecraftPort;
const minecraftOptions = { query: true };

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});


app.use(express.static("public"));
app.get("/", function (request, response) {
    response.sendStatus(200);
});

var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});





client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const PREFIX = '.amikom ';
const PREFIX2 = '.unesa ';

client.on('messageCreate', async message => {
    if (message.content === '.getstatuscuki') { // Anda dapat mengganti pesan pemicu sesuai keinginan Anda
        try {
            const result = await mcs.statusJava(minecraftHost, minecraftPort, minecraftOptions);
            const isOnline = result.online;
            const host = result.host.toString();
            const port = result.port.toString();    
    
            const serverVersionFull = result.version.name_raw;
            const match = serverVersionFull.match(/\d+\.\d+\.\d+/);
            const serverVersion = match ? match[0] : 'N/A';
    
            const onlinePlayers = result.players.online;
            const maxPlayers = result.players.max;
            const onlinePlayerText = `${onlinePlayers.toString().padStart(3, '0')}/${maxPlayers.toString()}`;

            const playerList = result.players.list;
    
            let playerNames = 'No players online.';
            if (playerList.length > 0) {
                playerNames = '';
                playerList.forEach((player) => {
                    const cleanedName = player.name_clean;
                    playerNames += `- ${cleanedName}\n`;
                });
            }
    
            const exampleEmbed = new EmbedBuilder() 
            .setColor(isOnline ? '#00FF00' : '#FF0000')
            .setTitle('GPLB MINECRAFT SERVER STATUS')
            .setURL('https://www.youtube.com/watch?v=xvFZjo5PgG0')
            .setAuthor({ name: 'Rehan wangsaf', iconURL: 'https://static.promediateknologi.id/crop/13x14:698x534/750x500/webp/photo/2023/06/20/a9e8e0d3-664a-4ae2-9e05-ef514058b992-3911330728.jpg'})
            //.setDescription('Some description here')
            .setThumbnail('https://cdn.discordapp.com/icons/1154025467100274688/e6e6c56200f33432444071a4715948ab.webp?size=128')
            .addFields(
                { name: 'Status', value: isOnline ? 'Online' : 'Offline', inline: true },
                { name: 'Online Player ', value: onlinePlayerText, inline: true },
                { name: 'Online Players', value: playerNames },
                { name: 'Host', value: host,inline: true  },
                { name: 'Port', value: port , inline: true },
                { name: 'Version', value: serverVersion.toString() , inline: true },
            )
            
            

            //.addFields({ name: 'Inline field title', value: 'Some value here' })
            //.setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        
            message.reply({ embeds: [exampleEmbed] });

        } catch (error) {
            console.error('Error:', error);
            message.reply('Cannot connect to Minecraft Server');
        }
    }
    if (message.content.startsWith(PREFIX)) { // Anda dapat mengganti pesan pemicu sesuai keinginan Anda
        try {
            
            const input = message.content.slice(PREFIX.length).trim();
            const match = input.match(/(\d+)\.(\d+)\.(\d+)/);
            if (match) {
                const year = match[1]; // Mengambil tahun
                const imageUrl = `https://fotomhs.amikom.ac.id/20${year}/${input.replace(/\./g, '_')}.jpg`;
          
                // Melakukan permintaan HTTP HEAD untuk memeriksa status gambar
                fetch(imageUrl, { method: 'HEAD' })
                  .then(response => {
                    if (response.status === 200) {
                      const embed = new EmbedBuilder()
                        .setTitle('Gambar yang Anda minta:')
                        .setImage(imageUrl);
          
                      // Kirim pesan dengan gambar
                      message.reply({ embeds: [embed] });
                    } else {
                      message.reply('Gambar tidak ditemukan.');
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    message.reply('Terjadi kesalahan saat memeriksa gambar.');
                  });
              } else {
                message.reply('Format input tidak valid. Gunakan format seperti "22.12.123".');
              }
           
        } catch (error) {
            console.error('Error:', error);
            message.reply('lol not work');
        }
    }
    if (message.content.startsWith(PREFIX2)) { // Anda dapat mengganti pesan pemicu sesuai keinginan Anda
        if (message.content.startsWith(PREFIX2)) { // Anda dapat mengganti pesan pemicu sesuai keinginan Anda
            try {
              const nim2 = message.content.slice(PREFIX2.length).trim();
          
              if (nim2.length === 11) { // Ubah 11 menjadi panjang yang sesuai
                const imageUrl = `https://siakadu.unesa.ac.id/photo/fotomhs/${nim2}.jpg`;
          
                // Melakukan permintaan HTTP HEAD untuk memeriksa status gambar
                fetch(imageUrl, { method: 'HEAD' })
                  .then(response => {
                    if (response.status === 200) {
                      const embed = new EmbedBuilder()
                        .setTitle('Gambar yang Anda minta:')
                        .setImage(imageUrl);
          
                      // Kirim pesan dengan gambar
                      message.reply({ embeds: [embed] });
                    } else {
                      message.reply('Gambar tidak ditemukan.');
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    message.reply('Terjadi kesalahan saat memeriksa gambar.');
                  });
              } else {
                message.reply('Format input tidak valid. Gunakan format seperti "17010041234".');
              }
            } catch (error) {
              console.error('Error:', error);
              message.reply('Terjadi kesalahan saat memeriksa gambar.');
            }
          }
        }
});


// Tentukan saluran di mana Anda ingin mengirim status Minecraft
const channelId = '1162330943063871559';
// Tentukan interval waktu dalam milidetik (misalnya, setiap 5 menit)
const interval = 60000; // 300000 milidetik = 5 menit
let previousIsOnline = true;
let previousOnlinePlayers = 1;

const sendMinecraftStatus = async () => {
    try {
        const result = await mcs.statusJava(minecraftHost, minecraftPort, minecraftOptions);
        const isOnline = result.online;
        const host = result.host.toString();
        const port = result.port.toString();
        const serverVersionFull = result.version.name_raw;
        const match = serverVersionFull.match(/\d+\.\d+\.\d+/);
        const serverVersion = match ? match[0] : 'N/A';
        const onlinePlayers = result.players.online;
        const maxPlayers = result.players.max;
        const onlinePlayerText = `${onlinePlayers.toString().padStart(3, '0')}/${maxPlayers.toString()}`;
        const playerList = result.players.list;

        let playerNames = 'No players online.';
        if (playerList.length > 0) {
            playerNames = '';
            playerList.forEach((player) => {
                const cleanedName = player.name_clean;
                playerNames += `- ${cleanedName}\n`;
            });
        }

        // Cek perubahan
        if (isOnline !== previousIsOnline || onlinePlayers !== previousOnlinePlayers) {
            // Buat embed Discord
            const exampleEmbed = new EmbedBuilder()
                .setColor(isOnline ? '#00FF00' : '#FF0000')
                .setTitle('GPLB MINECRAFT SERVER STATUS')
                .setURL('https://www.youtube.com/watch?v=xvFZjo5PgG0')
                .setAuthor({ name: 'Rehan wangsaf', iconURL: 'https://static.promediateknologi.id/crop/13x14:698x534/750x500/webp/photo/2023/06/20/a9e8e0d3-664a-4ae2-9e05-ef514058b992-3911330728.jpg' })
                .setThumbnail('https://cdn.discordapp.com/icons/1154025467100274688/e6e6c56200f33432444071a4715948ab.webp?size=128')
                .addFields(
                    { name: 'Status', value: isOnline ? 'Online' : 'Offline', inline: true },
                    { name: 'Online Player ', value: onlinePlayerText, inline: true },
                    { name: 'Online Players', value: playerNames },
                    { name: 'Host', value: host, inline: true },
                    { name: 'Port', value: port, inline: true },
                    { name: 'Version', value: serverVersion.toString(), inline: true },
                )
                .setTimestamp();

            // Dapatkan saluran berdasarkan ID
            const channel = client.channels.cache.get(channelId);

            // Kirim pesan ke saluran
            channel.send({ embeds: [exampleEmbed] });

            // Perbarui nilai-nilai sebelumnya
            previousIsOnline = isOnline;
            previousOnlinePlayers = onlinePlayers;
        }

    } catch (error) {
        console.error('Error:', error);
        // Jika terjadi kesalahan, Anda dapat menambahkan tindakan lain di sini
    }
};

// Jalankan fungsi setiap interval tertentu
setInterval(sendMinecraftStatus, interval);
client.login(discordToken);