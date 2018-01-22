"use_strict";

const RealmController = require("./RealmController");


class APIController {

	constructor() {
		this.realmController = new RealmController();
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
		this.checkDataIsValid(req, res, req.params, ["id"], function(req, res) {
			var account = this.realmController.getAccount(req.params.id);
			if(account) {
				res.json(account);
			} else {
				res.sendStatus(500);
			}
		});		
	};
	postAccount(req, res) {
		var that = this;
		this.checkDataIsValid(req, res, req.body, ["mail", "password", "firstName", "surname", "street", "postCode", "city", "country"], function(req, res) {
			var account = that.realmController.createAccount(req.body);
			if(account) {
				res.status(200).json(account);
			} else {
				res.sendStatus(500);
			}
		});
	};
	putAccount(req, res) {
		var that = this;
		this.checkDataIsValid(req, res, req.params, ["id"], function(req, res) {
			var account = that.realmController.updateAccount(req.params.id, req.body);
			if(account) {
				res.status(200).json(account);
			} else {
				res.sendStatus(500);
			}
		});	
	};

	// Restaurant
	getRestaurants(req, res) {
		res.sendStatus(501);
	};
	getRestaurant(req, res) {
		this.checkDataIsValid(req, res, req.params, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};
	postRestaurant(req, res) {
		res.sendStatus(501);
	};
	putRestaurant(req, res) {
		this.checkDataIsValid(req, res, req.params, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};

	// Table
	getTables(req, res) {
		this.checkDataIsValid(req, res, req.params, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};
	getTable(req, res) {
		this.checkDataIsValid(req, res, req.params, ["restaurantId", "tableId"], function(req, res) {
			res.sendStatus(501);
		});		
	};
	postTable(req, res) {
		this.checkDataIsValid(req, res, req.params, ["restaurantId"], function(req, res) {
			res.sendStatus(501);
		});	
	};
	putTable(req, res) {
		this.checkDataIsValid(req, res, req.params, ["restaurantId", "tableId"], function(req, res) {
			res.sendStatus(501);
		});	
	};

	// Helper
	checkDataIsValid(req, res, data, necessaryParams, validCallback) {
		var valid = true;
		for(var item of necessaryParams) {
			if(!data[item]) {
				valid = false;
				console.log("MISSING: " + item);
				break;
			}
		}
		if(valid) {
			if(validCallback) {
				validCallback(req, res);
			}
		} else {
			res.sendStatus(400);
		}
	};
};
module.exports = APIController;