'use strict';

const APIController = require('./APIController');
const RealmVoiceDeviceController = require('../../ro-realm/controller/RealmVoiceDeviceController');

class VoiceDeviceController extends APIController {
    constructor () {
        super();
        this.realmController = new RealmVoiceDeviceController();
        this.getVoiceDevices = this.getVoiceDevices.bind(this);
        this.getVoiceDevice = this.getVoiceDevice.bind(this);
        this.postVoiceDevice = this.postVoiceDevice.bind(this);
        this.putVoiceDevice = this.putVoiceDevice.bind(this);
    };
    getVoiceDevices (req, res) {
        let validQueryParams = this.requestValidator.validRequestData(req.query, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validQueryParams, function () {
            return that.realmController.getVoiceDevicesByRestaurantId(req.query.restaurantId);
        }, res);
    };
    getVoiceDevice (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'voiceDeviceId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getVoiceDeviceById(req.params.voiceDeviceId);
        }, res);
    };
    postVoiceDevice (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'restaurantId', type: 'string'},
            {name: 'number', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            return that.realmController.createVoiceDevice(req.body.restaurantId, req.body);
        }, res);
    };
    putVoiceDevice (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, [
            {name: 'restaurantId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validBody, function () {
            // UPDATE METHOD IN REALM CONTROLLER -> ONLY BODY AS PARAMETER
            return that.realmController.updateVoiceDevice(req.body.voiceDeviceId, req.body);
        }, res);
    };
    deleteVoiceDevice (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, [
            {name: 'voiceDeviceId', type: 'string'}
        ]);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.deleteVoiceDevice(req.params.voiceDeviceId);
        }, res);
    }
}
module.exports = VoiceDeviceController;
