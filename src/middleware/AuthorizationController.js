'use_strict';

class AuthorizationController {
	authorization(req, res, next) {
		var accountStr = '/account/'
		if(req.originalUrl.includes(accountStr)) {
			var accountId = req.originalUrl.substring(accountStr.length, req.originalUrl.length);
			if(accountId) {
				// Check token and accountId
				if(true) {
					next();
				} else {
					res.sendStatus(403);
				}
			} else {
				next();
			}
		} else {
			next();
		}
	}
};
module.exports = AuthorizationController;