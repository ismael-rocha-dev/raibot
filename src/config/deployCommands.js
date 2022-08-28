// enviar as informações sobre os comandos para o discord armazenar.
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = require('../commands/');

const { CLIENT_ID, TOKEN } = process.env;

// converter dados de comandos em uma string JSON
const commandsJSON = [];

for (const command of commands) {
	commandsJSON.push(command.data.toJSON());
}

// Enviar dados de comandos para a API do discord
const rest = new REST({ version: '9' }).setToken(TOKEN);

const deployCommands = async () => {
	try {
		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandsJSON });
		console.log('Successfully registered application commands.');
	}
	catch (error) {
		console.error(error);
	}
};

module.exports = deployCommands;

