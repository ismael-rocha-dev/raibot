const { createReunionResumeText } = require('../../../utils/createReunionResumeText');
const fs = require('fs/promises');
const { Member } = require('../../models/member.model');
const { reunionsRepository } = require('../../reunionsRepository');
const path = require('path');
const cargosDiscord_setores = require('../../../../setoresRaitec/cargosDiscord_setores');
const ReunionGoogleSheetsProvider = require('../../../providers/ReunionGoogleSheetsProvider');

const reunionGoogleSheetsProvider = new ReunionGoogleSheetsProvider();

const endReunionUseCase = {
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;

		if (!voiceChannel) {
			return 'Você precisa estar em um canal de voz para finalizar uma reunião';
		}

		const reunion = await reunionsRepository.getReunionById(voiceChannel.id);

		if (!reunion) {
			throw new Error('Não existe uma reunião neste canal de voz! Digite /iniciar_reuniao para iniciar uma reunião.');
		}

		reunion.updateTotalMinutes();

		if (reunion.totalMinutes >= 300) return 'Reunião Ultrapassou o limite de 5 horas';

		// Atualiza tempo total de cada membro
		reunion.members = reunion.members.map((member) => {
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

		const sectorsGoogleSheetLinks = JSON.parse(
			await fs.readFile(path.resolve(__dirname, '../../../../setoresRaitec/spreadsheets_ids.json')),
		);

		for (const cargoDiscord of cargosDiscord_setores.keys()) {
			try {
				const membersOfOneSector = reunion.members.filter((member_) => {
					return member_.roles.includes(cargoDiscord);
				});

				if (membersOfOneSector.length === 0) continue;

				const sectorObjectKey = cargosDiscord_setores.get(cargoDiscord);

				const spreadsheetId = sectorsGoogleSheetLinks[sectorObjectKey];

				await reunionGoogleSheetsProvider.saveReunion(spreadsheetId, reunion.description, membersOfOneSector);
			} catch (error) {
				await interaction.channel.send(`**------------>Houve um erro ao salvar na planilha da ${cargoDiscord}<------------**`);
				continue;
			}
		}

		const reunionJSON = createReunionResumeText(reunion);

		return reunionJSON;
	},
};

module.exports = { endReunionUseCase };
