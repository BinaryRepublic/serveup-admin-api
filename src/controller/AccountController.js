'use strict';

const APIController = require('../../ro-express-helper/controller/APIController');
const RealmAccountController = require('../../ro-realm/controller/RealmAccountController');
const RealmRestaurantController = require('../../ro-realm/controller/RealmRestaurantController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');
const RealmVoiceDeviceController = require('../../ro-realm/controller/RealmVoiceDeviceController');

const Authorization = require('../../ro-express-helper/middleware/Authorization');

class AccountController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmAccountController();
        this.realmRestaurantController = new RealmRestaurantController();
        this.realmMenuController = new RealmMenuController();
        this.realmVoiceDeviceController = new RealmVoiceDeviceController();

        this.authorization = new Authorization();

        this.getAccounts = this.getAccounts.bind(this);
        this.getAccountById = this.getAccountById.bind(this);
        this.postAccount = this.postAccount.bind(this);
        this.putAccount = this.putAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    };
    getAccounts (req, res) {
        let that = this;
        this.handleRequest(false, function () {
            let authorization = that.authorization.request(req.accountId, 'Account', false);
            if (authorization && !authorization.error) {
                return that.realmController.getAccounts();
            } else {
                return authorization;
            }
        }, res, req);
    };
    getAccountById (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Account', req.params.accountId);
            if (authorization && !authorization.error) {
                return that.realmController.getAccountById(req.params.accountId);
            } else {
                return authorization;
            }
        }, res, req);
    };
    postAccount (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'mail', type: 'string'},
            {name: 'password', type: 'string'},
            {name: 'firstName', type: 'string'},
            {name: 'surName', type: 'string'},
            {name: 'street', type: 'string'},
            {name: 'postCode', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'country', type: 'string'},
            {name: 'phone', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            let authorization = that.authorization.request(req.accountId, 'Account', false);
            if (authorization && !authorization.error) {
                return that.realmController.createAccount(req.body);
            } else {
                return authorization;
            }
        }, res, req);
    };
    putAccount (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Account', req.params.accountId);
            if (authorization && !authorization.error) {
                return that.realmController.updateAccount(req.params.accountId, req.body);
            } else {
                return authorization;
            }
        }, res, req);
    };
    deleteAccount (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Account', false);
            if (authorization && !authorization.error) {
                let accountId = req.params.accountId;
                // delete restaurants
                let restaurants = that.realmRestaurantController.getRestaurantsByAccountId(accountId);
                restaurants = that.realmRestaurantController.formatRealmObj(restaurants);
                restaurants.forEach((restaurant) => {
                    // delete menus
                    let menus = that.realmMenuController.getMenuByRestaurantId(restaurant.id);
                    menus.forEach((menu) => {
                        that.realmMenuController.deleteMenu(menu.id);
                    });
                    // delete voice devices
                    let voiceDevices = that.realmVoiceDeviceController.getVoiceDevicesByRestaurantId(restaurant.id);
                    voiceDevices.forEach((voiceDevice) => {
                        that.realmVoiceDeviceController.deleteVoiceDevice(voiceDevice.id);
                    });
                    that.realmRestaurantController.deleteRestaurant(restaurant.id);
                });
                return that.realmController.deleteAccount(accountId);
            } else {
                return authorization;
            }
        }, res, req);
    }
}
module.exports = AccountController;
