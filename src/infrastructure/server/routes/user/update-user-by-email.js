/**
 * update-user-by-email.js
 * Vishal Kumar
 */

'use strict';

const { validateInput, toApiResponse, ApiError, errorCodes: { internalServerErrorCode } } = require(`../../utils`);

const createUpdateUserByEmailRoute = async ({ core: { User: { updateUserByEmail } }, router, ExpressValidator: { body, validationResult } }) => {
	router.put(
		`/updateUserByEmail`,
		[
			body(`email`).isEmail(),
			body(`newEmail`).isEmail(),
		],
		validateInput(validationResult),
		toApiResponse(async ({ body: { email, newEmail } }) => {
			try {
				await updateUserByEmail({ email, newEmail });
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
	createUpdateUserByEmailRoute,
};