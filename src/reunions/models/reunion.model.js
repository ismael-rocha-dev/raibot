class Reunion {
	constructor({ voiceChannelId, membersInReunion }) {
		this.voiceChannelId = voiceChannelId;
		this.membersInReunion = membersInReunion;
		this.iniciatedAt = Date.now();
	}

}

module.exports = { Reunion };