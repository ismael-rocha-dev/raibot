const { VoiceState } = require('discord.js');
const { updateReunionUseCase } = require('./updateReunionUseCase');

const updateReunionController = {
	async handle(oldState = new VoiceState(), newState = new VoiceState()) {


		await updateReunionUseCase.execute(oldState, newState);

	},
};

module.exports = { updateReunionController };