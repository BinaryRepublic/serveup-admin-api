'use strict';

const APIController = require('./APIController');
const RealmAccountController = require('../../ro-realm/controller/RealmAccountController');

class AccountController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmAccountController();
        this.getAccounts = this.getAccounts.bind(this);
        this.getAccountById = this.getAccountById.bind(this);
        this.postAccount = this.postAccount.bind(this);
        this.putAccount = this.putAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    };
    getAccounts (req, res) {
        let that = this;
        this.handleRequest([], function () {
            return that.realmController.getAccounts();
        }, res);
    };
    getAccountById (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getAccountById(req.params.accountId);
        }, res);
    };
    postAccount (req, res) {
        let properties = ['mail', 'password', 'firstName', 'surName', 'street', 'postCode', 'city', 'country', 'phone'];
        let validBody = this.requestValidator.validRequestData(req.body, properties);
        let that = this;
        this.handleRequest(validBody, function () {
            return that.realmController.createAccount(req.body);
        }, res);
    };
    putAccount (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.updateAccount(req.params.accountId, req.body);
        }, res);
    };
    deleteAccount (req, res) {
        let that = this;
        this.handleRequest([], function () {
            return that.realmController.deleteAccount(req.params.accountId);
        }, res);
    }
}
module.exports = AccountController;
