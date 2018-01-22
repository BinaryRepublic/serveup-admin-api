"use_strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AccessController = require('./src/middleware/AccessController.js');
let accessController = new AccessController();

app.use('/', accessController.access);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', require('./src/routes'));
app.listen(4000, () => console.log('Admin API running on port 4000'));