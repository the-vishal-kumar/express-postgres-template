/**
 * error.js
 * Vishal Kumar
 */

'use strict';

const { ApiError, errorCodes: { internalServerErrorCode } } = require(`../utils`);

// eslint-disable-next-line no-unused-vars
const createErrorRoute = ({ reportError }) => (err, req, res, next) => {
	const errorExpected = err instanceof ApiError;
	if (!errorExpected || err.status >= 500) reportError(err, req);

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
			// Raw database errors stay in the error reporter, not in the response.
			details: status >= 500 ? undefined : details,
		},
	});
};

module.exports = {
	createErrorRoute,
};