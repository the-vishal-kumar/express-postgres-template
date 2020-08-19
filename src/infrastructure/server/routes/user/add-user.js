/**
 * add-user.js
 * Vishal Kumar
 */

'use strict';

const { validateInput, response: { toApiResponse, ApiError, errorCodes: { internalServerErrorCode } } } = require('../../utils');

const sendResponse = async ({ body: { email } }) => {
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

        next(apiError);
    };
};

const createAddUserRoute = async ({ core: { User: { addUser } }, router, ExpressValidator: { body, validationResult } }) => {
    router.post(
        '/addUser',
        [
            body('email').isEmail()
        ],
        validateInput(validationResult),
        toApiResponse(sendResponse)
    );

    return router;
};

module.exports = {
    createAddUserRoute,
};