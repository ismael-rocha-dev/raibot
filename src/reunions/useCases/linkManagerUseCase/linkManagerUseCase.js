const fs = require('fs/promises');
const path = require("path");

const linkManagerUseCase = {
	async execute(link_raitec) {
    
    const RAITEC_NAME = "RAITec";

    const filePath = path.resolve(__dirname, "setoresRaitec\spreadsheets_ids.json");
	
    const file = await fs.readFile(filePath);

    const fileObject = JSON.parse(file);

    fileObject[RAITEC_NAME] = link_raitec;
    
    const fileJson = JSON.stringify(fileObject);

    await fs.writeFile(filePath, fileJson);

	},
};

module.exports = { createReunionUseCase };