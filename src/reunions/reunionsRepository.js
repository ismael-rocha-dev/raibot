const fs = require('fs/promises');
const path = require('path');
const { Member } = require('./models/member.model');
const { Reunion } = require('./models/reunion.model');

const reunionsFolderPath = path.join(__dirname, './tmp/');

const reunionsRepository = {
	async create(voiceChannelId = '', membersInReunion = [new Member()]) {
		const reunion = new Reunion(voiceChannelId, membersInReunion);
		const reunionJSON = JSON.stringify(reunion);
		const reunionFilePath = reunionsFolderPath + voiceChannelId + '.json';
		await fs.writeFile(reunionFilePath, reunionJSON);

	},

	async delete(voiceChannelId = '') {
		const reunionsDir = await fs.readdir(reunionsFolderPath);
		const reunionFileName = reunionsDir.find(file => file.startsWith(voiceChannelId));

		if (!reunionFileName) {
			return;
		}

		await fs.rm(reunionsFolderPath + reunionFileName);
	},

	async getReunionById(voiceChannelId = '') {
		const reunionsDir = await fs.readdir(reunionsFolderPath);
		const reunionFileName = reunionsDir.find(file => file.startsWith(voiceChannelId));

		if (!reunionFileName) {
			return null;
		}

		const reunionFileRawData = await fs.readFile(reunionsFolderPath + reunionFileName);
		const reunionFileContent = JSON.parse(reunionFileRawData);

		const reunion = new Reunion();
		Object.assign(reunion, reunionFileContent);

		return reunion;
	},

	async addMemberInReunion(voiceChannelId = '', memberId = '', memberName = '') {
		// create member
		const newMember = new Member(memberId, memberName);

		// get reunion
		const reunion = await this.getReunionById(voiceChannelId);

		if (!reunion) return;

		// Add member in reunion
		reunion.members.push(newMember);

		// save reunion file
		const reunionJSON = JSON.stringify(reunion);
		await fs.writeFile(reunionsFolderPath + voiceChannelId + '.json', reunionJSON);

	},

	async getMemberInReunion(voiceChannelId = '', memberId = '') {
		const reunion = await this.getReunionById(voiceChannelId);

		if (!reunion) return;

		const memberAtributesOnly = reunion.members.find(member => member.id === memberId);

		if (!memberAtributesOnly) return;

		const member = new Member();

		Object.assign(member, memberAtributesOnly);

		return member;
	},

	async updateMemberTotalMinutes(voiceChannelId = '', memberId = '') {
		const reunion = await this.getReunionById(voiceChannelId);

		if (!reunion) return;

		const member = await this.getMemberInReunion(voiceChannelId, memberId);

		if (!member) return;

		member.updateTotalMinutes();
		member.exitReunion();


		const index = reunion.members.findIndex(memberInReunion => memberInReunion.id === memberId);

		reunion.members[index] = member;


		// save reunion file
		const reunionJSON = JSON.stringify(reunion);
		await fs.writeFile(reunionsFolderPath + voiceChannelId + '.json', reunionJSON);
	},

	async updateMemberLastTimeEnteredReunion(voiceChannelId = '', memberId = '') {
		const reunion = await this.getReunionById(voiceChannelId);

		if (!reunion) return;

		const member = await this.getMemberInReunion(voiceChannelId, memberId);

		if (!member) return;

		member.enterReunion();
		member.updateLastTimeEnteredReunion();

		reunion.members = reunion.members.map(memberInReunion => {
			if (memberInReunion.id === member.id) {
				return member;
			}
			return memberInReunion;
		});

		// save reunion file
		const reunionJSON = JSON.stringify(reunion);
		await fs.writeFile(reunionsFolderPath + voiceChannelId + '.json', reunionJSON);
	},

	async updateReunionTotalMinutes(voiceChannelId) {
		const reunion = await this.getReunionById(voiceChannelId);
		reunion.updateTotalMinutes();

		// save reunion file
		const reunionJSON = JSON.stringify(reunion);
		await fs.writeFile(reunionsFolderPath + voiceChannelId + '.json', reunionJSON);
	},
};

module.exports = { reunionsRepository };