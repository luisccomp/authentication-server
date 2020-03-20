const { Router } = require('express');

const AuthenticationController = require('./controllers/AuthenticationController');


const routes = Router();

// Routes handled by AuthenticationController.
routes.post('/api/auth/login', AuthenticationController.login);
routes.post('/api/auth/store', AuthenticationController.store);
routes.get('/api/auth/check', AuthenticationController.check);

module.exports = routes;
