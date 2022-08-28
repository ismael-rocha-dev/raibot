const { Member } = require('./member.model');

class Reunion {
	constructor(voiceChannelId = '', membersInReunion = [new Member()]) {
		this.id = voiceChannelId;
		this.members = membersInReunion;
		this.initiatedAt = Date.now();
		this.totalMinutes = 0;
	}
	updateTotalMinutes() {
		this.totalMinutes = Math.round((Date.now() - this.initiatedAt) / 60000);
	}

}

module.exports = { Reunion };