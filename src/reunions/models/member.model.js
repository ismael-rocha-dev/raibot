class Member {
	constructor(memberId = '', memberName = '') {
		this.id = memberId;
		this.name = memberName;
		this.totalMinutes = 0;
		this.lastTimeEnteredReunion = Date.now();
		this.isPresent = true;
	}
	updateTotalMinutes() {
		const minutes = Math.round((Date.now() - this.lastTimeEnteredReunion) / 60000);
		this.totalMinutes += minutes;
	}
	updateLastTimeEnteredReunion() {
		this.lastTimeEnteredReunion = Date.now();
	}
	enterReunion() {
		this.isPresent = true;
	}
	exitReunion() {
		this.isPresent = false;
	}

}

module.exports = { Member };