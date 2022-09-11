const { reunionsRepository } = require('../../reunionsRepository');

const updateReunionUseCase = {
	async execute(oldState, newState) {
		if (oldState.channelId === newState.channelId) return;
		// Have in mind that: oldState.channelId !== newState.ChannelId


		// member entered a voice channel
		if (oldState.channelId === null) {

			// verify if there is a reunion in new voice channel
			const reunion = await reunionsRepository.getReunionById(newState.channelId);

			if (!reunion) return;

			// verify if the member is in the reunion
			const member = await reunionsRepository.getMemberInReunion(newState.channelId, newState.member.id);

			if (!member) {
				// add member in reunion if not
				await reunionsRepository.addMemberInReunion(
					newState.channelId,
					newState.member.id,
					newState.member.user.username,
				);
				return;
			}

			// update member last time they entered that reunion
			await reunionsRepository.updateMemberLastTimeEnteredReunion(newState.channelId, newState.member.id);
			return;
		}

		// member left a voice channel
		if (newState.channelId === null) {

			// verify if there is a reunion in this voice channel
			const reunion = await reunionsRepository.getReunionById(oldState.channelId);

			if (!reunion) return;

			await reunionsRepository.updateMemberTotalMinutes(oldState.channelId, oldState.member.id);

			return;
		}

		// member has exited a voice channel and entered another voice channel
		// oldState.channelId !== null and newState.channelId !== null

		const exitedReunion = await reunionsRepository.getReunionById(oldState.channelId);

		if (exitedReunion) {
			await reunionsRepository.updateMemberTotalMinutes(oldState.channelId, oldState.member.id);
		}

		const enteredReunion = await reunionsRepository.getReunionById(newState.channelId);

		if (enteredReunion) {
			const member = await reunionsRepository.getMemberInReunion(newState.channelId, newState.member.id);

			if (!member) {
				// add member in reunion if not already in
				await reunionsRepository.addMemberInReunion(
					newState.channelId,
					newState.memer.id,
					newState.member.user.username,
				);
				return;
			}

			await reunionsRepository.updateMemberLastTimeEnteredReunion(newState.channelId, newState.member.id);
		}

	},
};

module.exports = { updateReunionUseCase };