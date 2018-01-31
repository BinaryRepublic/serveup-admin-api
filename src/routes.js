'use_strict';

const Router = require('express').Router();
const AccountController = require('./controller/AccountController');
const RestaurantController = require('./controller/RestaurantController');
const VoiceDeviceController = require('./controller/VoiceDeviceController');
const MenuController = require('./controller/MenuController');
const FileController = require('./controller/FileController');

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
Router.put('/account/:accountId/restaurant/:restaurantId/voiceDevice/:voiceDeviceId', voiceDeviceController.putVoiceDevice);

// VoiceDevice
let menuController = new MenuController();
Router.get('/account/:accountId/restaurant/:restaurantId/menu', menuController.getMenus);
Router.get('/account/:accountId/restaurant/:restaurantId/menu/:menuId', menuController.getMenu);
Router.post('/account/:accountId/restaurant/:restaurantId/menu', menuController.postMenu);
Router.put('/account/:accountId/restaurant/:restaurantId/menu/:menuId', menuController.putMenu);
Router.post('/account/:accountId/restaurant/:restaurantId/menu/:menuId/validate', menuController.validateMenu);

// Realm File Upload
let fileController = new FileController();
Router.post('/upload', fileController.uploadRequest);

module.exports = Router;