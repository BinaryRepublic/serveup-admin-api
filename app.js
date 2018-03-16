'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const promBundle = require('express-prom-bundle');
// const path = require('path');
const metricsMiddleware = promBundle({
    includeStatusCode: true,
    includeMethod: true,
    includePath: true
});
const AccessController = require('./src/middleware/AccessController.js');
let accessController = new AccessController();
const AuthorizationController = require('./src/middleware/AuthorizationController.js');
let authorizationController = new AuthorizationController();
const fileUpload = require('express-fileupload');

app.use(metricsMiddleware);
app.use('/', accessController.access);
app.use('/', authorizationController.authorization);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', require('./src/routes'));
module.exports = app.listen(4000, () => console.log('Admin API running on port 4000'));
