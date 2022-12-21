const { endReunionUseCase } = require('./endReunionUseCase');

const endReunionController = {
	async handle(interaction) {
		try {
			const reunionText = await endReunionUseCase.execute(interaction);

			await interaction.reply(reunionText);
		} catch (error) {
			await interaction.reply(error.message);
		}
	},
};

module.exports = { endReunionController };
