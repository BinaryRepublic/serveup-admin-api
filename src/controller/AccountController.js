'use_strict'

const APIController = require('./APIController');
const RealmAccountController = require('../../ro-realm/APIController');

class AccountController extends APIController {
	constructor() {
		super();
		this.realmController = new RealmAccountController();
		this.getAccount = this.getAccount.bind(this);
		this.postAccount = this.postAccount.bind(this);
		this.putAccount = this.putAccount.bind(this);
	};
	getAccount(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		if(validParams) {
			let account = this.realmController.getAccount(req.params.accountId);
			this.handleResponse(res, account);
		} else {
			res.sendStatus(400);
		};
	};
	postAccount(req, res) {
		let params = ['mail', 'password', 'firstName', 'surname', 'street', 'postCode', 'city', 'country'];
		let validBody = this.requestValidator.validRequestData(req.body, params);
		if(validBody) {
			let account = this.realmController.createAccount(req.body);
			this.handleResponse(res, account);
		} else {
			res.sendStatus(400);
		};
	};
	putAccount(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		if(validParams) {
			let account = this.realmController.updateAccount(req.params.accountId, req.body);
			this.handleResponse(res, account);
		} else {
			res.sendStatus(400);
		};
	};
}
module.exports = AccountController;