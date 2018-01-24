"use_strict";

class RequestValidator {
	validRequestData(data, necessaryData) {
		var valid = true;
		for(var item in necessaryData) {
			if (!data.hasOwnProperty(item)) {
				valid = false;
				console.error("MISSING: " + item);
				break;
    		}
		}
		return valid
	};
};
module.exports = RequestValidator;