/**
 * get-user-by-email.js
 * Vishal Kumar
 */

'use strict';

const { validateInput, toApiResponse, ApiError, errorCodes: { internalServerErrorCode } } = require(`../../utils`);

const createGetUserByEmailRoute = async ({ core: { User: { getUserByEmail } }, router, ExpressValidator: { param, validationResult } }) => {
	router.get(
		`/getUserByEmail/:email`,
		[
			param(`email`).isEmail()
		],
		validateInput(validationResult),
		toApiResponse(async ({ params: { email } }) => {
			try {
				let data = await getUserByEmail({ email });
				return { status: 201, data };
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
	createGetUserByEmailRoute,
};