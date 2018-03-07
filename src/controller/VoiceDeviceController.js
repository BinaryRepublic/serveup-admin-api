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
        let validQueryParams = this.requestValidator.validRequestData(req.query, ['restaurantId']);
        let that = this;
        this.handleRequest(validQueryParams, function () {
            return that.realmController.getVoiceDevicesByRestaurantId(req.query.restaurantId);
        }, res);
    };
    getVoiceDevice (req, res) {
        let validParams = this.requestValidator.validRequestData(req.params, ['voiceDeviceId']);
        let that = this;
        this.handleRequest(validParams, function () {
            return that.realmController.getVoiceDeviceById(req.params.voiceDeviceId);
        }, res);
    };
    postVoiceDevice (req, res) {
        let validQueryParams = this.requestValidator.validRequestData(req.query, ['restaurantId']);
        let validBody = this.requestValidator.validRequestData(req.body, ['name', 'restaurantId']);
        let validRequest = validQueryParams && validBody;
        let that = this;
        this.handleRequest(validRequest, function () {
            return that.realmController.createVoiceDevice(req.query.restaurantId, req.body);
        }, res);
    };
    putVoiceDevice (req, res) {
        let validBody = this.requestValidator.validRequestData(req.body, ['restaurantId']);
        let that = this;
        this.handleRequest(validBody, function () {
            // UPDATE METHOD IN REALM CONTROLLER -> ONLY BODY AS PARAMETER
            return that.realmController.updateVoiceDevice(req.body.voiceDeviceId, req.body);
        }, res);
    };
}
module.exports = VoiceDeviceController;
