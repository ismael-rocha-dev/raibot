const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reuniao')
		.setDescription('Conta o tempo de uma reunião e salva na planilha de horas.'),
	async execute(interaction) {

		const user_voice_channel = interaction.member.voice.channel;

		console.log(interaction.member.user.username);

		if (interaction.member.voice.channel) {
			console.log(interaction.member.voice.channel.name);
		}


		if (!user_voice_channel) {
			return await interaction.reply('Você precisa estar em um canal de voz para iniciar uma reunião');
		}

		await interaction.reply('Iniciando reunião... Nome: ' + interaction.member.user.username);
	},
};

