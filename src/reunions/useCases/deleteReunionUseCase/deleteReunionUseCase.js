const { reunionsRepository } = require('../../reunionsRepository');

const deleteReunionUseCase = {
	async execute(voiceChannel) {
		const reunion = await reunionsRepository.getReunionById(voiceChannel.id);

		if (!reunion) {
			throw new Error('Não existe uma reunião neste canal de voz! Digite /iniciar_reuniao para iniciar uma reunião.');
		}

		await reunionsRepository.delete(voiceChannel.id);
	},
};

module.exports = { deleteReunionUseCase };