'use_strict';

const Router = require('express').Router();
const AccountController = require('./controller/AccountController');
const RestaurantController = require('./controller/RestaurantController');
const VoiceDeviceController = require('./controller/VoiceDeviceController');

// Account
let accountController = new AccountController();
Router.get('/account/:id', accountController.getAccount);
Router.post('/account', accountController.postAccount);
Router.put('/account/:id', accountController.putAccount);

// Restaurant
let restaurantController = new RestaurantController();
Router.get('/restaurant/', restaurantController.getRestaurants);
Router.get('/restaurant/:restaurantId', restaurantController.getRestaurant);
Router.post('/restaurant/', restaurantController.postRestaurant);
Router.put('/restaurant/:restaurantId', restaurantController.putRestaurant);

// VoiceDevice
let voiceDeviceController = new VoiceDeviceController();
Router.get('/restaurant/:restaurantId/voiceDevice', voiceDeviceController.getVoiceDevices);
Router.get('/restaurant/:restaurantId/voiceDevice/:voiceDeviceId', voiceDeviceController.getVoiceDevice);
Router.post('/restaurant/:restaurantId/voiceDevice', voiceDeviceController.postVoiceDevice);
Router.put('/restaurant/:restaurantId/table/:voiceDeviceId', voiceDeviceController.putVoiceDevice);

module.exports = Router;