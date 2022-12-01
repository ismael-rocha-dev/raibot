const { Member } = require('./member.model');

class Reunion {
	constructor(voiceChannelId = '', membersInReunion = [new Member()], description = '') {
		this.id = voiceChannelId;
		this.members = membersInReunion;
		this.initiatedAt = Date.now();
		this.totalMinutes = 0;
		this.description = description;
	}
	updateTotalMinutes() {
		this.totalMinutes = Math.round((Date.now() - this.initiatedAt) / 60000);
	}

}

module.exports = { Reunion };