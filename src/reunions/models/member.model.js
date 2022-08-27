class Member {
	constructor({ memberId, memberName }) {
		this.memberId = memberId;
		this.memberName = memberName;
		this.totalMinutes = 0;
		this.lastTimeEnteredReunion = Date.now();
	}
	getMinutesSince(dateInMiliseconds) {
		const minutes = Math.round((Date.now() - dateInMiliseconds) / 60000);
		return minutes;
	}
}

module.exports = { Member };