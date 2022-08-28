const { Client } = require('discord.js');
const { updateReunionController } = require('../reunions/useCases/updateReunionUseCase/updateReunionController');

const voiceStateUpdate = (client = new Client()) => client.on('voiceStateUpdate', async (oldState, newState) => {
	try {
		await updateReunionController.handle(oldState, newState);
	}
	catch (error) {
		console.log(error);
	}
});


module.exports = { voiceStateUpdate };