"use_strict";

class RequestValidator {
	checkDataIsValid(req, res, data, necessaryParams, validCallback) {
		var valid = true;
		for(var item of necessaryParams) {
			if(!data[item]) {
				valid = false;
				console.error("MISSING: " + item);
				break;
			}
		}
		if(valid) {
			if(validCallback) {
				validCallback(req, res);
			}
		} else {
			res.sendStatus(400);
		}
	};
};
module.exports = RequestValidator;