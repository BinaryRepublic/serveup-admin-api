'use_strict'

const APIController = require('./APIController');

class RestaurantController extends APIController {
	constructor() {
		super();
		this.getRestaurants = this.getRestaurants.bind(this);
		this.getRestaurant = this.getRestaurant.bind(this);
		this.postRestaurant = this.postRestaurant.bind(this);
		this.putRestaurant = this.putRestaurant.bind(this);
	};
	getRestaurants(req, res) {
		var validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		if(validParams) {
			res.sendStatus(501);
		} else {
			res.sendStatus(400);
		};
	};
	getRestaurant(req, res) {
		var validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		if(validParams) {
			res.sendStatus(501);
		} else {
			res.sendStatus(400);
		};
	};
	postRestaurant(req, res) {
		var validParams = this.requestValidator.validRequestData(req.params, ['accountId']);
		var validBody = this.requestValidator.validRequestData(req.body, ['']);
		if(validParams && validBody) {
			res.sendStatus(501);
		} else {
			res.sendStatus(400);
		};
	};
	putRestaurant(req, res) {
		var validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		if(validParams) {
			res.sendStatus(501);
		} else {
			res.sendStatus(400);
		};
	};
}
module.exports = RestaurantController;