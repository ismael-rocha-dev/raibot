const { createReunionResumeText } = require('../../../utils/createReunionResumeText');
const { Member } = require('../../models/member.model');
const { reunionsRepository } = require('../../reunionsRepository');

const endReunionUseCase = {
	async execute(voiceChannel) {
		const reunion = await reunionsRepository.getReunionById(voiceChannel.id);

		if (!reunion) {
			throw new Error('Não existe uma reunião neste canal de voz! Digite /iniciar_reuniao para iniciar uma reunião.');
		}

		// Atualiza tempo total de reunião
		reunion.updateTotalMinutes();

		// Atualiza tempo total de cada membro
		reunion.members = reunion.members.map(member => {
			if (member.isPresent) {
				const memberOBJ = new Member();
				Object.assign(memberOBJ, member);
				memberOBJ.updateTotalMinutes();
				memberOBJ.exitReunion();
				return memberOBJ;
			}
			return member;
		});

		await reunionsRepository.delete(voiceChannel.id);
		const reunionJSON = createReunionResumeText(reunion);
		return reunionJSON;
	},
};

module.exports = { endReunionUseCase };