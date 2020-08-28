/**
 * delete-user-by-email.js
 * Vishal Kumar
 */

'use strict';

const { validateInput, toApiResponse, ApiError, errorCodes: { internalServerErrorCode } } = require(`../../utils`);

const createDeleteUserByEmailRoute = async ({ core: { User: { deleteUserByEmail } }, router, ExpressValidator: { body, validationResult } }) => {
	router.delete(
		`/deleteUserByEmail`,
		[
			body(`email`).isEmail()
		],
		validateInput(validationResult),
		toApiResponse(async ({ body: { email } }) => {
			try {
				await deleteUserByEmail({ email });
				return {};
			} catch (error) {
				let apiError = new ApiError({
					code: internalServerErrorCode,
					details: error,
				});

				if (error.code) {
					apiError = error;
				}

				throw apiError;
			}
		})
	);

	return router;
};

module.exports = {
	createDeleteUserByEmailRoute,
};