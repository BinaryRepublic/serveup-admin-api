'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use('/', require('./ro-express-helper/middleware/access').main);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use('/', require('./ro-express-helper/authRoutes'));
app.use(require('./ro-express-helper/middleware/authentication'));
app.use('/', require('./src/routes'));

module.exports = app.listen(4000, () => console.log('Admin API running on port 4000'));
