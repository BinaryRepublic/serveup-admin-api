'use_strict'

const APIController = require('./APIController');
const RealmRestaurantController = require('../../ro-realm/controller/RealmRestaurantController');

class RestaurantController extends APIController {
	constructor() {
		super();
		this.realmController = new RealmRestaurantController();
		this.getRestaurants = this.getRestaurants.bind(this);
		this.getRestaurant = this.getRestaurant.bind(this);
		this.postRestaurant = this.postRestaurant.bind(this);
		this.putRestaurant = this.putRestaurant.bind(this);
	};
	getRestaurants(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.getRestaurants(req.params.accountId);
		}, res);
	};
	getRestaurant(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.getRestaurant(req.params.restaurantId);
		}, res);
	};
	postRestaurant(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		let validBody = this.requestValidator.validRequestData(req.body, ['name']);
		let validRequest = validParams && validBody;
		let that = this;
		this.handleRequest(validRequest, function() {
			return that.realmController.createRestaurant(req.params.accountId, req.body);
		}, res);
	};
	putRestaurant(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['restaurantId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.updateRestaurant(req.params.restaurantId, req.body);
		}, res);
	};
}
module.exports = RestaurantController;