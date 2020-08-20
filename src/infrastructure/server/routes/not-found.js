/**
 * not-found.js
 * Vishal Kumar
 */

'use strict';

const {
	ApiError,
	errorCodes: { notFoundErrorCode },
} = require(`../utils/response.js`);

const createNotFoundRoute = (req, res) => {
	let apiError = new ApiError({ code: notFoundErrorCode });
	res.status(apiError.status).send({
		success: false,
		status: apiError.status,
		error: {
			code: apiError.code,
			message: apiError.message,
			details: apiError.details,
		},
	});
};

module.exports = {
	createNotFoundRoute,
};