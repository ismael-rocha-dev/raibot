const { interactionCreate } = require('./interactionCreate.js');
const { voiceStateUpdate } = require('./voiceStateUpdate');
const { once } = require('./once');
const { Client } = require('discord.js');

const setAllEvents = (client = new Client()) => {
	interactionCreate(client);
	voiceStateUpdate(client);
	once(client);
};

module.exports = setAllEvents;