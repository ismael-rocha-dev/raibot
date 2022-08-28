const { endReunionUseCase } = require('./endReunionUseCase');

const endReunionController = {
	async handle(interaction) {
		const user_voice_channel = interaction.member.voice.channel;

		if (!user_voice_channel) {
			return await interaction.reply('Você precisa estar em um canal de voz para finalizar uma reunião');
		}

		try {
			const reunionText = await endReunionUseCase.execute(user_voice_channel);

			await interaction.reply('Reunião finalizada! \n' + reunionText);
		}
		catch (error) {
			await interaction.reply(error.message);
		}
	},
};

module.exports = { endReunionController };