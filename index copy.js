const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});
const express = require("express");
const app = express();

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
  
  client.on('messageCreate', message => {
    console.log(`Received message: ${message.content} from ${message.author.tag}`);
    if (message.content === 'ping') {
      message.reply('Pong!');
    }
  });
  
const token = '';
client.login(token);

const mcs = require('node-mcstatus');

// ...

const host = '';
const port = 2014;
const options = { query: true };

// The `port` argument is optional and defaults
// to 25565. The `options` argument is optional.
mcs.statusJava(host, port, options)
    .then((result) => {
        // `result` will be the same shape and
        // properties as what is documented on
        // our website.
        // https://mcstatus.io/docs#java-status
    })
    .catch((error) => {
        // If the server is offline, then
        // you will NOT receive an error here.
        // Instead, you will use the `result.online`
        // boolean values in `.then()`.
        // Receiving an error here means that there
        // was an error with the service itself.
    })



    const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", function (request, response) {
    response.sendStatus(200);
});

var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

const mcs = require('node-mcstatus');

const host = '122.248.43.86';
const port = 2014;
const minecraftOptions = { query: true };

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.content === '.getstatus') { // Anda dapat mengganti pesan pemicu sesuai keinginan Anda
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
});

const token = 'MTE1OTg3OTM1NTQ0MzQ2NjM4MQ.GSUbbW.WZhdBJ-m811X2gS95pgctFsCUQetnf4toNUJjI';
client.login(token);