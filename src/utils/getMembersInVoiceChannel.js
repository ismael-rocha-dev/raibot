const { Member } = require('../reunions/models/member.model');

const getMembersInVoiceChannel = (voiceChannel) => {
	if (!voiceChannel) return null;

	const { members } = voiceChannel || null;

	if (!members) return null;

	const membersArray = [];

	members.each(member => {
		const { id, username } = member.user;

		const newMember = new Member({ memberId: id, memberName: username });

		membersArray.push(newMember);
	});
	return membersArray;
};

module.exports = { getMembersInVoiceChannel };