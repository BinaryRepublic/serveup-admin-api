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
		this.requestValidator.checkDataIsValid(req, res, req.params, ['accountId'], function(req, res) {
			var account = this.realmController.getAccount(req.params.id);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		});
	};
	postAccount(req, res) {
		var that = this;
		this.requestValidator.checkDataIsValid(req, res, req.body, ['mail', 'password', 'firstName', 'surname', 'street', 'postCode', 'city', 'country'], function(req, res) {
			var account = that.realmController.createAccount(req.body);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		});
	};
	putAccount(req, res) {
		var that = this;
		this.requestValidator.checkDataIsValid(req, res, req.params, ['accountId'], function(req, res) {
			var account = that.realmController.updateAccount(req.params.id, req.body);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		});
	};
}
module.exports = AccountController;