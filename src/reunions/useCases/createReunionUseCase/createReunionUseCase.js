const { getMembersInVoiceChannel } = require('../../../utils/getMembersInVoiceChannel');
const { reunionsRepository } = require('../../reunionsRepository');

const createReunionUseCase = {
	async execute(voiceChannel) {
		const voiceChannelId = voiceChannel.id;

		const reunionAlreadyExists = await reunionsRepository.getReunionById(voiceChannelId);

		if (reunionAlreadyExists) {
			throw new Error('Já existe uma reunião nesse canal de voz');
		}

		const membersInReunion = getMembersInVoiceChannel(voiceChannel);
		await reunionsRepository.create(voiceChannelId, membersInReunion);

	},
};

module.exports = { createReunionUseCase };