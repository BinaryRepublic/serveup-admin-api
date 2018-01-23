'use_strict'

const APIController = require('./APIController');
const RealmRestaurantController = require('../../ro-realm/APIController');

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
		if(validParams) {
			let restaurants = this.realmController.getRestaurants(req.params.accountId);
			this.handleResponse(res, restaurants);
		} else {
			res.sendStatus(400);
		};
	};
	getRestaurant(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		if(validParams) {
			let restaurant = this.realmController.getRestaurant(req.params.restaurantId);
			this.handleResponse(res, restaurant);
		} else {
			res.sendStatus(400);
		};
	};
	postRestaurant(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		let validBody = this.requestValidator.validRequestData(req.body, ['name']);
		if(validParams && validBody) {
			let newRestaurant = this.realmController.createRestaurant(req.params.accountId, req.body);
			this.handleResponse(res, newRestaurant);
		} else {
			res.sendStatus(400);
		};
	};
	putRestaurant(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		if(validParams) {
			let updatedRestaurant = this.realmController.updateRestaurant(req.params.restaurantId, req.body);
			this.handleResponse(res, updatedRestaurant);
		} else {
			res.sendStatus(400);
		};
	};
}
module.exports = RestaurantController;