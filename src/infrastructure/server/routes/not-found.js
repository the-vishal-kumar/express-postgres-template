/**
 * not-found.js
 * Vishal Kumar
 */

'use strict';

const { ApiError, errorCodes: { notFoundErrorCode } } = require(`../utils`);

const createNotFoundRoute = () => () => {
	throw new ApiError({ code: notFoundErrorCode });
};

module.exports = {
	createNotFoundRoute,
};