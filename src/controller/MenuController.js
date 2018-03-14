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
        let validQueryParams = this.requestValidator.validRequestData(req.query, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validQueryParams, function () {
            return that.realmController.getMenuByRestaurantId(req.query.restaurantId);
        }, res);
    };
    getMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getMenuById(req.params.voiceDeviceId);
        }, res);
    };
    postMenu (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'name', type: 'string'},
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        let requestData = req.body;
        if (!requestData.drinks) {
            // create empty menu
            requestData.drinks = [];
            requestData.defaultParents = [];
        }
        this.handleRequest(validBody, function () {
            return that.realmController.createMenu(requestData);
        }, res);
    };
    validateMenu (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'restaurantId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'drinks', type: 'array'},
            {name: 'defaultParents', type: 'object'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            return that.realmController.validateMenu(req.body);
        }, res);
    };
    putMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.updateMenu(req.params.menuId, req.body);
        }, res);
    };
    deleteMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.deleteMenu(req.params.menuId);
        }, res);
    };
}
module.exports = MenuController;
