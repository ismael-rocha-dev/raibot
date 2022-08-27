const fs = require('fs/promises');
const path = require('path');
const { Reunion } = require('./models/reunion.model');

const reunionsFolder = path.join(__dirname, './tmp/');

const reunionsRepository = {
	async create({ voiceChannelId, membersInReunion }) {
		const reunion = new Reunion({ voiceChannelId, membersInReunion });
		const reunionJSON = JSON.stringify(reunion);
		const reunionFilePath = reunionsFolder + voiceChannelId + '.json';
		await fs.writeFile(reunionFilePath, reunionJSON);

	},

	async delete(voiceChannelId) {
		const reunionsDir = await fs.readdir(reunionsFolder);
		const reunionFileName = reunionsDir.find(file => file.startsWith(voiceChannelId));

		if (!reunionFileName) {
			return;
		}

		await fs.rm(reunionsFolder + reunionFileName);
	},

	async getReunionById(voiceChannelId) {
		const reunionsDir = await fs.readdir(reunionsFolder);
		const reunionFileName = reunionsDir.find(file => file.startsWith(voiceChannelId));

		if (!reunionFileName) {
			return undefined;
		}

		const reunionFileRawData = await fs.readFile(reunionsFolder + reunionFileName);
		const reunion = JSON.parse(reunionFileRawData);
		return reunion;
	},

	addMemberInReunion({ voiceChannelId, memberId, memberName }) {
		return;
	},

	updateUserTimeInReunion({ voiceChannelId, memberId }) {
		return;
	},
};

module.exports = { reunionsRepository };