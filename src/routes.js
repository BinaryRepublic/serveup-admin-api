'use_strict';

const Router = require('express').Router();
const AccountController = require('./controller/AccountController');
const RestaurantController = require('./controller/RestaurantController');
const VoiceDeviceController = require('./controller/VoiceDeviceController');

// Account
let accountController = new AccountController();
Router.get('/account/:accountId', accountController.getAccount);
Router.post('/account', accountController.postAccount);
Router.put('/account/:accountId', accountController.putAccount);

// Restaurant
let restaurantController = new RestaurantController();
Router.get('/account/:accountId/restaurant/', restaurantController.getRestaurants);
Router.get('/account/:accountId/restaurant/:restaurantId', restaurantController.getRestaurant);
Router.post('/account/:accountId/restaurant/', restaurantController.postRestaurant);
Router.put('/account/:accountId/restaurant/:restaurantId', restaurantController.putRestaurant);

// VoiceDevice
let voiceDeviceController = new VoiceDeviceController();
Router.get('/account/:accountId/restaurant/:restaurantId/voiceDevice', voiceDeviceController.getVoiceDevices);
Router.get('/account/:accountId/restaurant/:restaurantId/voiceDevice/:voiceDeviceId', voiceDeviceController.getVoiceDevice);
Router.post('/account/:accountId/restaurant/:restaurantId/voiceDevice', voiceDeviceController.postVoiceDevice);
Router.put('/account/:accountId/restaurant/:restaurantId/table/:voiceDeviceId', voiceDeviceController.putVoiceDevice);

module.exports = Router;