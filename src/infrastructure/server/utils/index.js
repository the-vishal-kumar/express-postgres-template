/**
 * utils/index.js
 * Vishal Kumar
 */

'use strict';

const { toPagination } = require(`./paginate`);
const { toApiResponse, ApiError, errorCodes } = require(`./response`);
const { validateInput } = require(`./validate-input`);

module.exports = {
	toPagination,
	toApiResponse,
	ApiError,
	errorCodes,
	validateInput,
};