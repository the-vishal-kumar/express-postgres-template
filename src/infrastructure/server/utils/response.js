/**
 * response.js
 * Vishal Kumar
 */

'use strict';

const toApiResponse = (fn) => async (req, res, next) => {
	try {
		const { status = 200, data, meta } = await fn(req, res);
		res.status(status).send({
			success: true,
			status,
			data,
			meta,
		});
	} catch (error) {
		next(error);
	}
};

const errorCodes = {
	notFoundErrorCode: `notFoundError`,
	badRequestErrorCode: `badRequestError`,
	internalServerErrorCode: `internalServerError`,
	validationErrorCode: `validationError`,
	emailAlreadyExistsErrorCode: `emailAlreadyExistsErrorCode`,
};

const errors = {
	[errorCodes.badRequestErrorCode]: {
		status: 400,
		message: `Bad request`,
	},
	[errorCodes.notFoundErrorCode]: {
		status: 404,
		message: `Resource not found`,
	},
	[errorCodes.internalServerErrorCode]: {
		status: 500,
		message: `Internal server error`,
	},
	[errorCodes.validationErrorCode]: {
		status: 422,
		message: `Validation error`,
	},
	[errorCodes.unauthorizedErrorCode]: {
		status: 401,
		message: `Unauthorized`,
	},
	[errorCodes.forbiddenErrorCode]: {
		status: 403,
		message: `Not allowed to access the resource`,
	},
	[errorCodes.tooManyRequestsErrorCode]: {
		status: 429,
		message: `Too many requests in this timeframe`,
	},
};

class ApiError extends Error {
	constructor({ code, message, status, details }) {
		super();
		this.code = code;
		this.message = message || errors[code].message;
		this.status = status || errors[code].status;
		this.details = details || null;
	}
}

module.exports = {
	toApiResponse,
	ApiError,
	errorCodes,
};