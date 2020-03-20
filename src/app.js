const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');


const app = express();

// Adding middlewares to process client's requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Adding routers to handle request's routes
app.use(routes);


module.exports = app;
