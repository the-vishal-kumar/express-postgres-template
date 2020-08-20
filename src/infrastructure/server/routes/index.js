/**
 * routes/index.js
 * Vishal Kumar
 */

'use strict';

const { createUserRoute } = require(`./user`);
const { createNotFoundRoute } = require(`./not-found`);


module.exports = {
	createUserRoute,
	createNotFoundRoute,
};