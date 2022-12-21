const { VoiceChannel } = require('discord.js');
const { Member } = require('../reunions/models/member.model');

const getMembersInVoiceChannel = (voiceChannel = new VoiceChannel()) => {
	if (!voiceChannel) return null;

	const { members } = voiceChannel || null;

	if (!members) return null;

	const membersArray = [];

	members.forEach((member) => {
		const { id, displayName, roles } = member;

		const rolesCollection = roles.cache;

		const memberRoles = rolesCollection.map((role) => role.name);

		const newMember = new Member(id, displayName, memberRoles);

		membersArray.push(newMember);
	});
	return membersArray;
};

module.exports = { getMembersInVoiceChannel };
