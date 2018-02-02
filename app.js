'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AccessController = require('./src/middleware/AccessController.js');
let accessController = new AccessController();
const AuthorizationController = require('./src/middleware/AuthorizationController.js');
let authorizationController = new AuthorizationController();

app.use('/', accessController.access);
app.use('/', authorizationController.authorization);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', require('./src/routes'));
app.listen(4000, () => console.log('Admin API running on port 4000'));
