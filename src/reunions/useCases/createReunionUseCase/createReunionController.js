const { createReunionUseCase } = require('./createReunionUseCase');
const createReunionController = {
	async handle(interaction) {
		const user_voice_channel = interaction.member.voice.channel;

		if (!user_voice_channel) {
			return await interaction.reply('Você precisa estar em um canal de voz para iniciar uma reunião');
		}

		try {
			await createReunionUseCase.execute(user_voice_channel);

			await interaction.reply('Iniciando reunião...');
		}
		catch (error) {
			await interaction.reply(error.message);
		}
	},
};

module.exports = { createReunionController };