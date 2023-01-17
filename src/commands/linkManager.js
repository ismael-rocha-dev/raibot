const { SlashCommandBuilder } = require('@discordjs/builders');
const { linkManagerController } = require('../reunions/useCases/linkManagerUseCase/linkManagerController');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link_da_planilha')
		.setDescription('Atribui os links das planilhas do RAITec')
		.addStringOption(option => option.setName('RAITec').setDescription('Link da planilha do RAITec')),
	async execute(interaction) {
		await createReunionController.handle(interaction);
	},
};