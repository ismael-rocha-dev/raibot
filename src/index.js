require('dotenv').config();


const { Client, Intents } = require('discord.js');
const { createTmpFolderIfNotExists } = require('./config/createTmpFolderIfNotExists');

const deployCommands = require('./config/deployCommands');
const setAllCommands = require('./config/setAllCommands');
const setAllEvents = require('./events');

// token de acesso ao bot
const { TOKEN } = process.env;

// Selecionar os Intents (Eventos) que iremos escutar da API do discord
const { GUILDS, GUILD_VOICE_STATES } = Intents.FLAGS;

// Objeto que representa um cliente do discord (BOT)
const client = new Client({ intents: [GUILDS, GUILD_VOICE_STATES] });

// Cria uma pasta para salvar temporariamente as reuniões
createTmpFolderIfNotExists();

//  Envia os comandos para a API do BOT
deployCommands();

// Cria um atributo commands em clients com todos os comandos do BOT
setAllCommands(client);

// Inicializa todos os eventos
setAllEvents(client);

client.login(TOKEN);