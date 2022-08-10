const { interactionCreate } = require('./interactionCreate.js');
const { once } = require('./once');

const setAllEvents = (client) => {
	interactionCreate(client);
	once(client);
};

module.exports = setAllEvents;