/**
 * validate-input.js
 * Vishal Kumar
 */

'use strict';

const { errorCodes: { validationErrorCode }, ApiError } = require(`./response`);

const validateInput = (validationResult) => (req, res, next) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		next();
		return;
	}

	next(new ApiError({
		code: validationErrorCode,
		details: errors.array(),
	}));

	// let apiError = new ApiError({
	//     code: validationErrorCode,
	//     details: errors.array(),
	// });
	// res.status(apiError.status).send({
	//     success: false,
	//     status: apiError.status,
	//     error: {
	//         code: apiError.code,
	//         message: apiError.message,
	//         details: apiError.details,
	//     },
	// });
};

module.exports = {
	validateInput,
};