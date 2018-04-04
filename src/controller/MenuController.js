'use strict';

const APIController = require('../../ro-express-helper/controller/APIController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');

const Authorization = require('../../ro-express-helper/middleware/Authorization');

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
                return that.realmController.getMenuByRestaurantId(req.query.restaurantId) || 'can not get menus (restaurantId: ' + req.query.restaurantId + ')';
            } else {
                return authorization;
            }
        }, res, req);
    };
    getMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Menu', req.params.menuId);
            if (authorization && !authorization.error) {
                return that.realmController.getMenuById(req.params.menuId) || 'can not get menu (menuId: ' + req.params.menuId + ')';
            } else {
                return authorization;
            }
        }, res, req);
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
                return that.realmController.createMenu(requestData) || 'can not create menu (restaurantId: ' + req.body.restaurantId + ')';
            } else {
                return authorization;
            }
        }, res, req);
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
            let authorization = that.authorization.request(req.accountId, 'RestaurantId', req.body.menuId);
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
        }, res, req);
    };
    putMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.updateMenu(req.params.menuId, req.body) || 'can not update menu (menuId: ' + req.params.menuId + ')';
        }, res, req);
    };
    deleteMenu (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'menuId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.deleteMenu(req.params.menuId) || 'can not delete menu (menuId: ' + req.params.menuId + ')';
        }, res, req);
    };
}
module.exports = MenuController;
