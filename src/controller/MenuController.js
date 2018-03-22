'use strict';

const APIController = require('./APIController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');

const Authorization = require('../middleware/controllerAuthorization');

class MenuController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmMenuController();
        this.authorization = new Authorization();
        this.getMenus = this.getMenus.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.postMenu = this.postMenu.bind(this);
        this.validateMenu = this.validateMenu.bind(this);
        this.putMenu = this.putMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
    };
    getMenus (req, res) {
        let validQueryParams = this.requestValidator.validRequestData(req.query, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validQueryParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Restaurant', req.query.restaurantId);
            if (authorization && !authorization.error) {
                return that.realmController.getMenuByRestaurantId(req.query.restaurantId);
            } else {
                return authorization;
            }
        }, res);
    };
    getMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Menu', req.params.menuId);
            if (authorization && !authorization.error) {
                return that.realmController.getMenuById(req.params.menuId);
            } else {
                return authorization;
            }
        }, res);
    };
    postMenu (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'name', type: 'string'},
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            let authorization = that.authorization.request(req.accountId, 'Menu', req.body.menuId);
            if (authorization && !authorization.error) {
                let requestData = req.body;
                if (!requestData.drinks) {
                    // create empty menu
                    requestData.drinks = [];
                    requestData.defaultParents = [];
                }
                return that.realmController.createMenu(requestData);
            } else {
                return authorization;
            }
        }, res);
    };
    validateMenu (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'restaurantId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'drinks', type: 'array'},
            {name: 'defaultParents', type: 'array'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            let authorization = that.authorization.request(req.accountId, 'Restaurant', req.body.restaurantId);
            if (authorization && !authorization.error) {
                var result = that.realmController.validateMenu(req.body);
                if (result === true) {
                    return req.body;
                } else {
                    return result;
                }
            } else {
                return authorization;
            }
        }, res);
    };
    putMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Menu', req.params.menuId);
            if (authorization && !authorization.error) {
                return that.realmController.updateMenu(req.params.menuId, req.body);
            } else {
                return authorization;
            }
        }, res);
    };
    deleteMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Menu', req.params.menuId);
            if (authorization && !authorization.error) {
                return that.realmController.deleteMenu(req.params.menuId);
            } else {
                return authorization;
            }
        }, res);
    };
}
module.exports = MenuController;
