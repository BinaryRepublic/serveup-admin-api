'use_strict'

const APIController = require('./APIController');
const RealmAccountController = require('../../ro-realm/controller/RealmAccountController');

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
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.getAccount(req.params.accountId);
		}, res);
	};
	postAccount(req, res) {
		let properties = ['mail', 'password', 'firstName', 'surname', 'street', 'postCode', 'city', 'country'];
		let validBody = this.requestValidator.validRequestData(req.body, properties);
		let that = this;
		this.handleRequest(validBody, function() {
			return that.realmController.createAccount(req.body);
		}, res);
	};
	putAccount(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.updateAccount(req.params.accountId, req.body);
		}, res);
	};
}
module.exports = AccountController;