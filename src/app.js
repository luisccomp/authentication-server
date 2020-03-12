const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');


const app = express();

// Adding middlewares to process client's requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Adding routers to handle request's routes
app.use(routes);

module.exports = app;
