'use_strict';

const Authorization = require('../../ro-express-helper/middleware/Authorization');

class FileController {
    constructor () {
        this.authorization = new Authorization();
    }
    uploadRequest (req, res) {
        // root only
        let authorization = this.authorization.request(req.accountId, false, false);
        if (authorization && !authorization.error) {
            if (!req.files.file || !req.files.fileLock) {
                res.sendStatus(400);
            } else {
                req.files.file.mv('./DataRealm/default.realm', (err) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        req.files.fileLock.mv('./DataRealm/default.realm.lock', (err) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        });
                    }
                });
            }
        } else {
            return authorization;
        }
    };
    downloadRequest (req, res) {
        // root only
        let authorization = this.authorization.request(req.accountId, false, false);
        if (authorization && !authorization.error) {
            if (!req.files.file || !req.files.fileLock) {
                res.sendStatus(400);
            } else {
                res.download('./DataRealm/default.realm');
            }
        } else {
            if (authorization) {
                res.sendStatus(400).json(authorization);
            } else {
                res.sendStatus(400);
            }
        }
    }
}
module.exports = FileController;
