"use_strict";

class APIController {

	constructor() {
		this.getAccount = this.getAccount.bind(this);
		this.postAccount = this.postAccount.bind(this);
		this.putAccount = this.putAccount.bind(this);
		this.getRestaurants = this.getRestaurants.bind(this);
		this.getRestaurant = this.getRestaurant.bind(this);
		this.postRestaurant = this.postRestaurant.bind(this);
		this.putRestaurant = this.putRestaurant.bind(this);
		this.getTables = this.getTables.bind(this);
		this.getTable = this.getTable.bind(this);
		this.postTable = this.postTable.bind(this);
		this.putTable = this.putTable.bind(this);
	};

	// Account
	getAccount(req, res) {
		this.checkParamsValid(req, res, ["id"], function(req, res) {
			res.sendStatus(501);
		});		
	};
	postAccount(req, res) {
		res.sendStatus(501);
	};
	putAccount(req, res) {
		this.checkParamsValid(req, res, ["id"], function(req, res) {
			res.sendStatus(501);
		});	
	};

	// Restaurant
	getRestaurants(req, res) {
		res.sendStatus(501);
	};
	getRestaurant(req, res) {
		this.checkParamsValid(req, res, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};
	postRestaurant(req, res) {
		res.sendStatus(501);
	};
	putRestaurant(req, res) {
		this.checkParamsValid(req, res, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};

	// Table
	getTables(req, res) {
		this.checkParamsValid(req, res, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};
	getTable(req, res) {
		this.checkParamsValid(req, res, ["restaurantId", "tableId"], function(req, res) {
			res.sendStatus(501);
		});		
	};
	postTable(req, res) {
		this.checkParamsValid(req, res, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};
	putTable(req, res) {
		this.checkParamsValid(req, res, ["restaurantId", "tableId"], function(req, res) {
			res.sendStatus(501);
		});	
	};

	// Helper
	checkParamsValid(req, res, necessaryParams, validCallback) {
		var valid = true;
		for(var param of necessaryParams) {
			if(!req.params[param]) {
				valid = false;
				break;
			}
		}
		if(valid) {
			if(validCallback) {
				validCallback(req, res);
			}
		}
		else {
			res.sendStatus(400);
		}		
	};
};
module.exports = APIController;