/**
 * error.js
 * Vishal Kumar
 */

'use strict';

const { ApiError, errorCodes: { internalServerErrorCode } } = require(`../utils`);

// eslint-disable-next-line no-unused-vars
const createErrorRoute = ({ reportError }) => (err, req, res, next) => {
	const errorExpected = err instanceof ApiError;
	if (!errorExpected) reportError(err, req);

	const { status, code, message, details } = errorExpected ?
		err
		:
		new ApiError({
			code: internalServerErrorCode,
		});

	res.status(status).send({
		success: false,
		status,
		error: {
			code,
			message,
			details,
		},
	});
};

module.exports = {
	createErrorRoute,
};