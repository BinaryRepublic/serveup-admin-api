'use strict';

const APIController = require('./APIController');
const RealmAccountController = require('../../ro-realm/controller/RealmAccountController');
const RealmRestaurantController = require('../../ro-realm/controller/RealmRestaurantController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');
const RealmVoiceDeviceController = require('../../ro-realm/controller/RealmVoiceDeviceController');

class AccountController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmAccountController();
        this.realmRestaurantController = new RealmRestaurantController();
        this.realmMenuController = new RealmMenuController();
        this.realmVoiceDeviceController = new RealmVoiceDeviceController();
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
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getAccountById(req.params.accountId);
        }, res);
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
            return that.realmController.createAccount(req.body);
        }, res);
    };
    putAccount (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.updateAccount(req.params.accountId, req.body);
        }, res);
    };
    deleteAccount (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
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
        }, res);
    }
}
module.exports = AccountController;
