const { createReunionUseCase } = require('./createReunionUseCase');
const createReunionController = {
	async handle(interaction) {
		const user_voice_channel = interaction.member.voice.channel;

		const reunion_description = interaction.options.getString('assunto');


		if (!user_voice_channel) {
			return await interaction.reply('Você precisa estar em um canal de voz para iniciar uma reunião');
		}

		try {
			await createReunionUseCase.execute(user_voice_channel, reunion_description);

			await interaction.reply('Iniciando reunião...');
		}
		catch (error) {
			await interaction.reply(error.message);
		}
	},
};

module.exports = { createReunionController };