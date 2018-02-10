'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const promBundle = require('express-prom-bundle');
const path = require('path');
const metricsMiddleware = promBundle({
    includeStatusCode: true,
    includeMethod: true,
    includePath: true
});
const AccessController = require('./src/middleware/AccessController.js');
let accessController = new AccessController();
const AuthorizationController = require('./src/middleware/AuthorizationController.js');
let authorizationController = new AuthorizationController();

app.use(metricsMiddleware);
app.use('/', accessController.access);
app.use('/', authorizationController.authorization);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/download', function (req, res) {
    var file = path.join(__dirname, 'DataRealm', 'default.realm');
    res.download(file);
});
app.use('/', require('./src/routes'));
app.listen(4000, () => console.log('Admin API running on port 4000'));
