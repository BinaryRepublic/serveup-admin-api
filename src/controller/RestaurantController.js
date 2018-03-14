'use strict';

const APIController = require('./APIController');
const RealmRestaurantController = require('../../ro-realm/controller/RealmRestaurantController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');
const RealmVoiceDeviceController = require('../../ro-realm/controller/RealmVoiceDeviceController');

class RestaurantController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmRestaurantController();
        this.realmMenuController = new RealmMenuController();
        this.realmVoiceDeviceController = new RealmVoiceDeviceController();
        this.getRestaurants = this.getRestaurants.bind(this);
        this.getRestaurant = this.getRestaurant.bind(this);
        this.postRestaurant = this.postRestaurant.bind(this);
        this.putRestaurant = this.putRestaurant.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    };
    getRestaurants (req, res) {
        let validQueryParams = this.requestValidator.validRequestData(req.query, [
            {name: 'accountId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validQueryParams, function () {
            return that.realmController.getRestaurantsByAccountId(req.query.accountId);
        }, res);
    };
    getRestaurant (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getRestaurantById(req.params.restaurantId);
        }, res);
    };
    postRestaurant (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'name', type: 'string'},
            {name: 'accountId', type: 'string'},
            {name: 'street', type: 'string'},
            {name: 'postCode', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'country', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            return that.realmController.createRestaurant(req.body);
        }, res);
    };
    putRestaurant (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.updateRestaurant(req.params.restaurantId, req.body);
        }, res);
    };
    deleteRestaurant (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let restaurantId = req.params.restaurantId;
            // delete menus
            let menus = that.realmMenuController.getMenuByRestaurantId(restaurantId);
            menus.forEach((menu) => {
                that.realmMenuController.deleteMenu(menu.id);
            });
            // delete voice devices
            let voiceDevices = that.realmVoiceDeviceController.getVoiceDevicesByRestaurantId(restaurantId);
            voiceDevices.forEach((voiceDevice) => {
                that.realmVoiceDeviceController.deleteVoiceDevice(voiceDevice.id);
            });
            return that.realmController.deleteRestaurant(restaurantId);
        }, res);
    };
}
module.exports = RestaurantController;
