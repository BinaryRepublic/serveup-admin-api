'use strict';

const APIController = require('../../ro-express-helper/controller/APIController');
const RealmVoiceDeviceController = require('../../ro-realm/controller/RealmVoiceDeviceController');

const Authorization = require('../../ro-express-helper/middleware/Authorization');

class VoiceDeviceController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmVoiceDeviceController();
        this.authorization = new Authorization();
        this.getVoiceDevices = this.getVoiceDevices.bind(this);
        this.getVoiceDevice = this.getVoiceDevice.bind(this);
        this.postVoiceDevice = this.postVoiceDevice.bind(this);
        this.putVoiceDevice = this.putVoiceDevice.bind(this);
        this.deleteVoiceDevice = this.deleteVoiceDevice.bind(this);
    };
    getVoiceDevices (req, res) {
        let validQueryParams = this.requestValidator.validRequestData(req.query, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validQueryParams, function () {
            let authorization = that.authorization.request(req.accountId, 'Restaurant', req.query.restaurantId);
            if (authorization && !authorization.error) {
                return that.realmController.getVoiceDevicesByRestaurantId(req.query.restaurantId);
            } else {
                return authorization;
            }
        }, res, req);
    };
    getVoiceDevice (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'voiceDeviceId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'VoiceDevice', req.params.voiceDeviceId);
            if (authorization && !authorization.error) {
                return that.realmController.getVoiceDeviceById(req.params.voiceDeviceId);
            } else {
                return authorization;
            }
        }, res, req);
    };
    postVoiceDevice (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'restaurantId', type: 'string'},
            {name: 'number', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            let authorization = that.authorization.request(req.accountId, 'Restaurant', req.body.restaurantId);
            if (authorization && !authorization.error) {
                return that.realmController.createVoiceDevice(req.body.restaurantId, req.body);
            } else {
                return authorization;
            }
        }, res, req);
    };
    putVoiceDevice (req, res) {
        let validBody = this.requestValidator.validRequestData(req.params, [
            {name: 'voiceDeviceId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            let authorization = that.authorization.request(req.accountId, 'VoiceDevice', req.params.voiceDeviceId);
            if (authorization && !authorization.error) {
                return that.realmController.updateVoiceDevice(req.params.voiceDeviceId, req.body);
            } else {
                return authorization;
            }
        }, res, req);
    };
    deleteVoiceDevice (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'voiceDeviceId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            let authorization = that.authorization.request(req.accountId, 'VoiceDevice', req.params.voiceDeviceId);
            if (authorization && !authorization.error) {
                return that.realmController.deleteVoiceDevice(req.params.voiceDeviceId);
            } else {
                return authorization;
            }
        }, res, req);
    }
}
module.exports = VoiceDeviceController;
