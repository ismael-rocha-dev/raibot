const { Reunion } = require('../reunions/models/reunion.model');

const createReunionResumeText = (reunion = new Reunion()) => {
	let reunionResumeText = `
		**Resumo da reunião**
		*Tempo de reunião: ${reunion.totalMinutes}m* \n
		**Membros em reunião:**
		`;

	reunion.members.forEach(member => {
		reunionResumeText += `\n*- ${member.name}: ${member.totalMinutes}m*`;
	});

	return reunionResumeText;
};

module.exports = { createReunionResumeText };