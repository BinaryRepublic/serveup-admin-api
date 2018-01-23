'use_strict'

const APIController = require('./APIController');

class AccountController extends APIController {
	constructor() {
		super();
		this.getAccount = this.getAccount.bind(this);
		this.postAccount = this.postAccount.bind(this);
		this.putAccount = this.putAccount.bind(this);
	};
	getAccount(req, res) {
		var validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		if(validParams) {
			var account = this.realmController.getAccount(req.params.accountId);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(400);
		};
	};
	postAccount(req, res) {
		var params = ['mail', 'password', 'firstName', 'surname', 'street', 'postCode', 'city', 'country'];
		var validBody = this.requestValidator.validRequestData(req.body, params);
		if(validBody) {
			var account = this.realmController.createAccount(req.body);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(400);
		};
	};
	putAccount(req, res) {
		var validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		if(validParams) {
			var account = this.realmController.updateAccount(req.params.accountId, req.body);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		} else {
			res.sendStatus(400);
		};
	};
}
module.exports = AccountController;