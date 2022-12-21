const axios = require('axios').default;

module.exports = class ReunionGoogleSheetsProvider {
	constructor() {
		this.googleSheetsEditorURL = process.env.GOOGLE_SHEETS_EDITOR_URL;
	}
	async saveReunion(spreadsheetId = '', description = '', members = [{ name: '', totalMinutes: 0 }]) {
		await axios.post(this.googleSheetsEditorURL, {
			spreadsheetId,
			reunion: {
				description,
				members,
			},
		});
	}
};
