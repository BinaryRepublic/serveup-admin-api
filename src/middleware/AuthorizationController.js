'use_strict';

class AuthorizationController {
	authorization(req, res, next) {
		var accountId = req.params.accountId;
		if(accountId) {
			// Check token and accountId
			if(true) {
				next();
			} else {
				res.sendStatus(403);
			}
		}
		else {
			next();
		}
	}
};
module.exports = AuthorizationController;