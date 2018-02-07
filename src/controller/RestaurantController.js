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
        let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getRestaurantsByAccountId(req.params.accountId);
        }, res);
    };
    getRestaurant (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getRestaurantById(req.params.restaurantId);
        }, res);
    };
    postRestaurant (req, res) {
        let restaurant = req.body;
        let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
        let validBody = this.requestValidator.validRequestData(restaurant, ['name']);
        let validRequest = validParams && validBody;
        let that = this;
        this.handleRequest(validRequest, function () {
            restaurant.accountId = req.params.accountId;
            return that.realmController.createRestaurant(restaurant);
        }, res);
    };
    putRestaurant (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['restaurantId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.updateRestaurant(req.params.restaurantId, req.body);
        }, res);
    };
    deleteRestaurant (req, res) {
        let that = this;
        this.handleRequest([], function () {
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
