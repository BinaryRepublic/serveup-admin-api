'use_strict'

const APIController = require('./APIController');

class VoiceDeviceController extends APIController {
	constructor() {
		super();
		this.getVoiceDevices = this.getVoiceDevices.bind(this);
		this.getVoiceDevice = this.getVoiceDevice.bind(this);
		this.postVoiceDevice = this.postVoiceDevice.bind(this);
		this.putVoiceDevice = this.putVoiceDevice.bind(this);
	};
	getVoiceDevices(req, res) {
		this.checkDataIsValid(req, res, req.params, ['restaurantId'], function(req, res) {
			res.sendStatus(501);
		});	
	};
	getVoiceDevice(req, res) {
		this.checkDataIsValid(req, res, req.params, ['restaurantId', 'voiceDeviceId'], function(req, res) {
			res.sendStatus(501);
		});		
	};
	postVoiceDevice(req, res) {
		this.checkDataIsValid(req, res, req.params, ['restaurantId'], function(req, res) {
			res.sendStatus(501);
		});	
	};
	putVoiceDevice(req, res) {
		this.checkDataIsValid(req, res, req.params, ['restaurantId', 'voiceDeviceId'], function(req, res) {
			res.sendStatus(501);
		});	
	};
}
module.exports = VoiceDeviceController;