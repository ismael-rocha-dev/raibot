const { SlashCommandBuilder } = require('@discordjs/builders');
const { createReunionController } = require('../reunions/useCases/createReunionUseCase/createReunionController');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('iniciar_reuniao')
		.setDescription('Conta o tempo de uma reunião e salva na planilha de horas.'),
	async execute(interaction) {
		await createReunionController.handle(interaction);
	},
};

