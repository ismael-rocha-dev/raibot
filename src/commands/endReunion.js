const { SlashCommandBuilder } = require('@discordjs/builders');
const { endReunionController } = require('../reunions/useCases/endReunionUseCase/endReunionController');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('finalizar_reuniao')
		.setDescription('Finalizar uma reunião em um canal de voz'),
	async execute(interaction) {
		await endReunionController.handle(interaction);
	},
};