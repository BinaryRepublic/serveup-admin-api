'use_strict'

const APIController = require('./APIController');
const RealmMenuController = require('../../ro-realm/controller/RealmMenuController');
const RealmRestaurantController = require('../../ro-realm/controller/RealmRestaurantController');

class MenuController extends APIController {
	constructor() {
		super();
		this.realmController = new RealmMenuController();
		this.realmRestaurantController = new RealmRestaurantController();
		this.getMenu = this.getMenu.bind(this);
		this.getMenus = this.getMenus.bind(this);
		this.postMenu = this.postMenu.bind(this);
		this.putMenu = this.putMenu.bind(this);
	};
	getMenu(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId', 'menuId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.getMenuById(req.params.menuId);
		}, res);
	};
	postMenu(req, res) {
		let validParams = this.requestValidator.validRequestData(req.body, ['accountId', 'restaurantId']);
		let properties = ['name', 'drinks', 'defaultParents'];
		let validBody = this.requestValidator.validRequestData(req.body, properties);
		let validRequest = validParams && validBody;
		let that = this;
		this.handleRequest(validRequest, function() {
			return that.realmController.createMenu(req.body);
		}, res);
	};
	putMenu(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId', 'menuId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.updateMenu(req.params.menuId, req.body);
		}, res);
	};
	validateMenu(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId', 'menuId']);
		if(validParams) {
			var result = this.realmController.validateMenu(req.body);
			if(result.error) {
				res.status(400).json(result.error);
			} else {
				res.sendStatus(200);
			}
		} else {
			res.sendStatus(400);
		};
	}
}
module.exports = MenuController;