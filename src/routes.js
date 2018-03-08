'use strict';

const Router = require('express').Router();
const AccountController = require('./controller/AccountController');
const RestaurantController = require('./controller/RestaurantController');
const MenuController = require('./controller/MenuController');
const VoiceDeviceController = require('./controller/VoiceDeviceController');
const FileController = require('./controller/FileController');

// Account
let accountController = new AccountController();
Router.get('/accounts', accountController.getAccounts);
Router.get('/account/:accountId', accountController.getAccountById);
Router.post('/account', accountController.postAccount);
Router.put('/account/:accountId', accountController.putAccount);
Router.delete('/account/:accountId', accountController.deleteAccount);

// Restaurant
let restaurantController = new RestaurantController();
Router.get('/restaurants/', restaurantController.getRestaurants);
Router.get('/restaurant/:restaurantId', restaurantController.getRestaurant);
Router.post('/restaurant/', restaurantController.postRestaurant);
Router.put('/restaurant/:restaurantId', restaurantController.putRestaurant);
Router.delete('/restaurant/:restaurantId', restaurantController.deleteRestaurant);

// Menus
let menuController = new MenuController();
Router.get('/menus', menuController.getMenus);
Router.get('/menu/:menuId', menuController.getMenu);
Router.post('/menu', menuController.postMenu);
Router.post('/menu/validate', menuController.validateMenu);
Router.put('/menu/:menuId', menuController.putMenu);
Router.delete('/menu/:menuId', menuController.deleteMenu);

// VoiceDevice
let voiceDeviceController = new VoiceDeviceController();
Router.get('/voiceDevices', voiceDeviceController.getVoiceDevices);
Router.get('/voiceDevice/:voiceDeviceId', voiceDeviceController.getVoiceDevice);
Router.post('/voiceDevice', voiceDeviceController.postVoiceDevice);
Router.put('/voiceDevice/:voiceDeviceId', voiceDeviceController.putVoiceDevice);
Router.delete('/voiceDevice/:voiceDeviceId', voiceDeviceController.deleteVoiceDevice);

// Realm File Upload
let fileController = new FileController();
Router.post('/upload', fileController.uploadRequest);

module.exports = Router;
