/**
 * get-all-users.js
 * Vishal Kumar
 */

'use strict';

const { toApiResponse, ApiError, errorCodes: { internalServerErrorCode } } = require(`../../utils`);

const createGetAllUsersRoute = async ({ core: { User: { getAllUsers } }, router }) => {
	router.get(
		`/getAllUsers`,
		toApiResponse(async () => {
			try {
				let data = await getAllUsers();
				return { status: 200, data };
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
	createGetAllUsersRoute,
};