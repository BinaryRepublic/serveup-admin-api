'use_strict'

const RequestValidator = require('./RequestValidator');

class APIController {
	constructor() {
		this.requestValidator = new RequestValidator();
	};
	handleResponse(res, jsonObject) {
		if(jsonObject) {
			res.json(jsonObject);
		} else {
			res.sendStatus(500);
		}
	}
}
module.exports = APIController;