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
const fileUpload = require('express-fileupload');

app.use(metricsMiddleware);
app.use('/', require('./src/middleware/accessControl').main);
app.use(require('./src/middleware/authorization'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// authentication
// app.use('/', require('./src/authRoutes'));
// app.use(require('./src/middleware/authentication'));

app.use('/', require('./src/routes'));
module.exports = app.listen(4000, () => console.log('Admin API running on port 4000'));
