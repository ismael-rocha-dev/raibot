const createTmpFolderIfNotExists = () => {
	const fs = require('fs');
	const tmpFolderAlreadyExists = fs.existsSync('src/reunions/tmp');
	if (!tmpFolderAlreadyExists) {
		fs.mkdirSync('src/reunions/tmp');
	}
};

module.exports = { createTmpFolderIfNotExists };