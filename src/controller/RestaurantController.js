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
		res.sendStatus(501);
	};
	getRestaurant(req, res) {
		this.checkDataIsValid(req, res, req.params, ['restaurantId'], function(req, res) {
			res.sendStatus(501);
		});	
	};
	postRestaurant(req, res) {
		res.sendStatus(501);
	};
	putRestaurant(req, res) {
		this.checkDataIsValid(req, res, req.params, ['restaurantId'], function(req, res) {
			res.sendStatus(501);
		});	
	};
}
module.exports = RestaurantController;