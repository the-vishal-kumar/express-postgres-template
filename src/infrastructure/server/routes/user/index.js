/**
 * user/index.js
 * Vishal Kumar
 */

'use strict';

const { Router } = require('express');
const ExpressValidator = require('express-validator');
const { createAddUserRoute } = require('./add-user');

const createUserRoute = (core) => {
    const router = new Router();

    createAddUserRoute({core, router, ExpressValidator});

    return router;
};

module.exports = {
    createUserRoute,
};