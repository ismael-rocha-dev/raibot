const { linkManagerUseCase } = require('./linkManagerUseCase');

const linkManagerController = {
	async handle(interaction) {
		try {

			const link_raitec = interaction.options.getString('RAITec');

            await linkManagerUseCase.execute(link_raitec);

			await interaction.reply('Links Atualizados!');

		} catch (error) {
			await interaction.reply(error.message);
		}
	},
};

module.exports = { linkManagerController };
