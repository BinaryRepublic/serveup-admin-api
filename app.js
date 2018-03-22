'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

app.use('/', require('./src/middleware/accessControl').main);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());

app.use('/', require('./src/authRoutes'));
app.use(require('./src/middleware/authentication'));

app.use('/', require('./src/routes'));
module.exports = app.listen(4000, () => console.log('Admin API running on port 4000'));
