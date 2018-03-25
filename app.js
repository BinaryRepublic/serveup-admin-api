'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createLogger, transports, winston } = require('winston');
const fileUpload = require('express-fileupload');

const logger = createLogger({
    transports: [
        new transports.File({ filename: 'combined.log', level: 'info' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ]
});
logger.exitOnError = false;

app.use('/', require('./src/middleware/accessControl').main);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use('/', require('./src/authRoutes'));
app.use(require('./src/middleware/authentication'));
app.use('/', require('./src/routes'));

app.use(function (req, res, next) {
    var logObj = {
        timestamp: new Date(),
        status: req.statusCode,
        route: req.path
    };
    if (req.statusCode !== 200) {
        let errorRes = res.body;
        if (errorRes && errorRes.error && errorRes.error.type && errorRes.error.msg) {
            logObj.errorType = errorRes.error.type;
            logObj.errorType = errorRes.error.msg;
        }
    }
    logger.info(JSON.stringify(logObj));
    next();
});

module.exports = app.listen(4000, () => console.log('Admin API running on port 4000'));
