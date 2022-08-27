const { Collection } = require('discord.js');
const commands = require('../commands/');

const setAllCommands = (client) => {
	// pegar os comandos criados na pasta ./commands
	client.commands = new Collection();


	for (const command of commands) {
		client.commands.set(command.data.name, command);
	}
};

module.exports = setAllCommands;
