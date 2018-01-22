'use_strict'

const RealmController = require('./RealmController');
const RequestValidator = require('./RequestValidator');

class APIController {
	constructor() {
		this.realmController = new RealmController();
		this.requestValidator = new RequestValidator();
	};
}
module.exports = APIController;