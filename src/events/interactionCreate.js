const { Client } = require('discord.js');

const interactionCreate = (client = new Client()) => client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.log(error);
		await interaction.reply({ content: 'Ocorreu um erro durante a execução do comando!', ephemeral: true });
	}
});


module.exports = { interactionCreate };