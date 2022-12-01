const { Reunion } = require('../reunions/models/reunion.model');

const createReunionResumeText = (reunion = new Reunion()) => {
	let reunionResumeText = `
**Reunião finalizada!**

**Resumo da reunião**
*Descrição: ${reunion.description}*
*Tempo de reunião: ${reunion.totalMinutes}m*

**Membros em reunião:**
`;

	reunion.members.forEach(member => {
		reunionResumeText += `\n	- ${member.name}: ${member.totalMinutes} min`;
	});

	return reunionResumeText;
};

module.exports = { createReunionResumeText };