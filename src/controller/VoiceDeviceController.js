'use_strict'

const APIController = require('./APIController');
const RealmVoiceDeviceController = require('../../ro-realm/controller/RealmVoiceDeviceController');

class VoiceDeviceController extends APIController {
	constructor() {
		super();
		this.realmController = new RealmVoiceDeviceController();
		this.getVoiceDevices = this.getVoiceDevices.bind(this);
		this.getVoiceDevice = this.getVoiceDevice.bind(this);
		this.postVoiceDevice = this.postVoiceDevice.bind(this);
		this.putVoiceDevice = this.putVoiceDevice.bind(this);
	};
	getVoiceDevices(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.getVoiceDevicesByRestaurantId(req.params.restaurantId);
		}, res);
	};
	getVoiceDevice(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId', 'voiceDeviceId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.getVoiceDeviceById(req.params.voiceDeviceId);
		}, res);
	};
	postVoiceDevice(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId']);
		let validBody = this.requestValidator.validRequestData(req.body, ['name']);
		let validRequest = validParams && validBody;
		let that = this;
		this.handleRequest(validRequest, function() {
			return that.realmController.createVoiceDevice(req.params.restaurantId, req.body);
		}, res);
	};
	putVoiceDevice(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['accountId', 'restaurantId', 'voiceDeviceId']);
		let that = this;
		this.handleRequest(validParams, function() {
			return that.realmController.updateVoiceDevice(req.params.voiceDeviceId, req.body);
		}, res);
	};
}
module.exports = VoiceDeviceController;