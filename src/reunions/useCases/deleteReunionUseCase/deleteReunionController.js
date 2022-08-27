const { deleteReunionUseCase } = require('./deleteReunionUseCase');

const deleteReunionController = {
	async handle(interaction) {
		const user_voice_channel = interaction.member.voice.channel;

		if (!user_voice_channel) {
			return await interaction.reply('Você precisa estar em um canal de voz para finalizar uma reunião');
		}

		try {
			await deleteReunionUseCase.execute(user_voice_channel);

			await interaction.reply('Reunião finalizada!');
		}
		catch (error) {
			await interaction.reply(error.message);
		}
	},
};

module.exports = { deleteReunionController };