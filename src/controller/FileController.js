'use_strict';

const path = require('path');

class FileController {
    uploadRequest (req, res) {
        if (!req.files.file || !req.files.fileLock) {
            res.sendStatus(400);
        }
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
    };
    downloadRequest (req, res) {
        var file = path.join('../../DataRealm', 'default.realm');
        res.download(file);
    }
}
module.exports = FileController;
