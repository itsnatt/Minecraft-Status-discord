
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

const PREFIX = '.lookthis ';

client.on('messageCreate', async message => {
    if (message.content === '.getstatuscuki') { // Anda dapat mengganti pesan pemicu sesuai keinginan Anda
        try {
            const result = await mcs.statusJava(minecraftHost, minecraftPort, minecraftOptions);
            const isOnline = result.online;
            const host = result.host;
            const port = result.port;
    
            const serverVersionFull = result.version.name_raw;
            const match = serverVersionFull.match(/\d+\.\d+\.\d+/);
            const serverVersion = match ? match[0] : 'N/A';
    
            const onlinePlayers = result.players.online;
            const maxPlayers = result.players.max;
            const playerList = result.players.list;
    
            let playerNames = 'No players online.';
            if (playerList.length > 0) {
                playerNames = 'Online Player(s):\n';
                playerList.forEach((player) => {
                    const cleanedName = player.name_clean;
                    playerNames += `Player Name: ${cleanedName}\n`;
                });
            }
    
            const statusMessage = `
            Server Status: ${isOnline ? 'Online' : 'Offline'}
            Host: ${host}
            Port: ${port}
            Server Version: java - ${serverVersion}
            Max Players: ${maxPlayers}
            Online Players: ${onlinePlayers}
            ${playerNames}
            `;
    
            message.reply(statusMessage);
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
                message.reply('Format input tidak valid. Gunakan format "tahun.bulan.tanggal" seperti "22.11.3847".');
              }
            
        
        
            
           
        } catch (error) {
            console.error('Error:', error);
            message.reply('lol not work');
        }
    }
});


client.login(discordToken);