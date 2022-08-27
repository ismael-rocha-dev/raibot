const { SlashCommandBuilder } = require('@discordjs/builders');
const { deleteReunionController } = require('../reunions/useCases/deleteReunionUseCase/deleteReunionController');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('finalizar_reuniao')
		.setDescription('Finalizar uma reunião em um canal de voz'),
	async execute(interaction) {
		await deleteReunionController.handle(interaction);
	},
};