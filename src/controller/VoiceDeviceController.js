'use_strict'

const APIController = require('./APIController');
const RealmVoiceDeviceController = require('../../ro-realm/RealmVoiceDeviceController');

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
		let validParams = this.requestValidator.validRequestData(req.params, ['restaurantId']);
		if(validParams) {
			let voiceDevices = this.realmController.getVoiceDevices(req.params.restaurantId);
			this.handleResponse(res, voiceDevices);
		} else {
			res.sendStatus(400);
		};
	};
	getVoiceDevice(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['voiceDeviceId']);
		if(validParams) {
			let voiceDevice = this.realmController.getVoiceDevice(req.params.voiceDeviceId);
			this.handleResponse(res, voiceDevice);
		} else {
			res.sendStatus(400);
		};
	};
	postVoiceDevice(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['restaurantId']);
		let validBody = this.requestValidator.validRequestData(req.body, ['name']);
		if(validParams && validBody) {
			let newRestaurant = this.realmController.createVoiceDevice(req.params.restaurantId, req.body);
			this.handleResponse(res, newRestaurant);
		} else {
			res.sendStatus(400);
		};
	};
	putVoiceDevice(req, res) {
		let validParams = this.requestValidator.validRequestData(req.params, ['voiceDeviceId']);
		if(validParams) {
			let updatedVoiceDevice = this.realmController.updateVoiceDevice(req.params.voiceDeviceId, req.body);
			this.handleResponse(res, updatedVoiceDevice);
		} else {
			res.sendStatus(400);
		};
	};
}
module.exports = VoiceDeviceController;