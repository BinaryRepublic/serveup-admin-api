'use strict';

const Router = require('express').Router();
const AccountController = require('./controller/AccountController');
const RestaurantController = require('./controller/RestaurantController');
const MenuController = require('./controller/MenuController');
const VoiceDeviceController = require('./controller/VoiceDeviceController');

// Account
let accountController = new AccountController();
Router.get('/accounts', accountController.getAccounts);
Router.get('/account/:accountId', accountController.getAccountById);
Router.post('/account', accountController.postAccount);
Router.put('/account/:accountId', accountController.putAccount);
Router.delete('/account/:accountId', accountController.deleteAccount);

// Restaurant
let restaurantController = new RestaurantController();
Router.get('/account/:accountId/restaurant/', restaurantController.getRestaurants);
Router.get('/account/:accountId/restaurant/:restaurantId', restaurantController.getRestaurant);
Router.post('/account/:accountId/restaurant/', restaurantController.postRestaurant);
Router.put('/account/:accountId/restaurant/:restaurantId', restaurantController.putRestaurant);
Router.delete('/account/:accountId/restaurant/:restaurantId', restaurantController.deleteRestaurant);

// Menus
let menuController = new MenuController();
Router.get('/account/:accountId/restaurant/:restaurantId/menu', menuController.getMenus);
Router.get('/account/:accountId/restaurant/:restaurantId/menu/:menuId', menuController.getMenu);
Router.post('/account/:accountId/restaurant/:restaurantId/menu', menuController.postMenu);
Router.post('/account/:accountId/restaurant/:restaurantId/menu/validate', menuController.validateMenu);
Router.put('/account/:accountId/restaurant/:restaurantId/menu/:menuId', menuController.putMenu);
Router.delete('/account/:accountId/restaurant/:restaurantId/menu/:menuId', menuController.deleteMenu);

// VoiceDevice
let voiceDeviceController = new VoiceDeviceController();
Router.get('/account/:accountId/restaurant/:restaurantId/voiceDevice', voiceDeviceController.getVoiceDevices);
Router.get('/account/:accountId/restaurant/:restaurantId/voiceDevice/:voiceDeviceId', voiceDeviceController.getVoiceDevice);
Router.post('/account/:accountId/restaurant/:restaurantId/voiceDevice', voiceDeviceController.postVoiceDevice);
Router.put('/account/:accountId/restaurant/:restaurantId/table/:voiceDeviceId', voiceDeviceController.putVoiceDevice);

module.exports = Router;
