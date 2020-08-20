/**
 * add-user.js
 * Vishal Kumar
 */

'use strict';

const { validateInput, toApiResponse, ApiError, errorCodes: { internalServerErrorCode } } = require(`../../utils`);

const createAddUserRoute = async ({ core: { User: { addUser } }, router, ExpressValidator: { body, validationResult } }) => {
	router.post(
		`/addUser`,
		[
			body(`email`).isEmail()
		],
		validateInput(validationResult),
		toApiResponse(async ({ body: { email } }) => {
			try {
				await addUser({ email });
				return { status: 201, data: null };
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
	createAddUserRoute,
};