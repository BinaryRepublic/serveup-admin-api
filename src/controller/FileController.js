'use_strict';

const path = require('path');

class FileController {
    uploadRequest (req, res) {
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
    };
    downloadRequest (req, res) {
        res.download('./DataRealm/default.realm');
    }
}
module.exports = FileController;
