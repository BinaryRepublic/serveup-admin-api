'use strict';

const APIController = require('./APIController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');

class MenuController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmMenuController();
        this.getMenus = this.getMenus.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.postMenu = this.postMenu.bind(this);
        this.putMenu = this.putMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
    };
    getMenus (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['restaurantId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getMenuByRestaurantId(req.params.restaurantId);
        }, res);
    };
    getMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['menuId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getMenuById(req.params.voiceDeviceId);
        }, res);
    };
    postMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['restaurantId']);
        let validBody = this.requestValidator.validRequestData(req.body, ['name']);
        let validRequest = validParams && validBody;
        let that = this;
        let requestData = req.body;
        if (!requestData.drinks) {
            // create empty menu
            requestData.drinks = [];
            requestData.defaultParents = [];
        }
        this.handleRequest(validRequest, function () {
            requestData.restaurantId = req.params.restaurantId;
            return that.realmController.createMenu(requestData);
        }, res);
    };
    validateMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['menuId']);
        let validBody = this.requestValidator.validRequestData(req.body, ['name', 'drinks', 'defaultParents']);
        let validRequest = validParams && validBody;
        let that = this;
        this.handleRequest(validRequest, function () {
            req.body.restaurantId = req.params.restaurantId;
            return that.realmController.validateMenu(req.body);
        }, res);
    };
    putMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['menuId']);
        let validBody = this.requestValidator.validRequestData(req.body, ['name']);
        let validRequest = validParams && validBody;
        let that = this;
        let requestData = req.body;
        if (!requestData.drinks) {
            // create empty menu
            requestData.drinks = [];
            requestData.defaultParents = [];
        }
        this.handleRequest(validRequest, function () {
            return that.realmController.updateMenu(req.params.menuId, requestData);
        }, res);
    };
    deleteMenu (req, res) {
        let that = this;
        this.handleRequest([], function () {
            return that.realmController.deleteMenu(req.params.menuId);
        }, res);
    };
}
module.exports = MenuController;
