/**
 * routes/index.js
 * Vishal Kumar
 */

'use strict';

const { createUserRoute } = require(`./user`);
const { createErrorRoute } = require(`./error`);
const { createNotFoundRoute } = require(`./not-found`);


module.exports = {
	createUserRoute,
	createErrorRoute,
	createNotFoundRoute,
};