"use_strict";

const Router = require('express').Router();
const APIController = require("./APIController.js");
let apiController = new APIController();

// Account
Router.get('/account/:id', apiController.getAccount);
Router.post('/account', apiController.postAccount);
Router.put('/account/:id', apiController.putAccount);

// Restaurant
Router.get('/restaurant/', apiController.getRestaurants);
Router.get('/restaurant/:restaurantId', apiController.getRestaurant);
Router.post('/restaurant/', apiController.postRestaurant);
Router.put('/restaurant/:restaurantId', apiController.putRestaurant);

// Tables
Router.get('/restaurant/:restaurantId/table', apiController.getTables);
Router.get('/restaurant/:restaurantId/table/:tableId', apiController.getTable);
Router.post('/restaurant/:restaurantId/table', apiController.postTable);
Router.put('/restaurant/:restaurantId/table/:tableId', apiController.putTable);

module.exports = Router;