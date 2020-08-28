/**
 * user/index.js
 * Vishal Kumar
 */

'use strict';

const { Router } = require(`express`);
const ExpressValidator = require(`express-validator`);
const { createAddUserRoute } = require(`./add-user`);
const { createGetAllUsersRoute } = require(`./get-all-users`);
const { createUpdateUserByEmailRoute } = require(`./update-user-by-email`);
const { createGetUserByEmailRoute } = require(`./get-user-by-email`);
const { createDeleteUserByEmailRoute } = require(`./delete-user-by-email`);

const createUserRoute = ({ core }) => {
	const router = new Router();

	createAddUserRoute({ core, router, ExpressValidator });
	createGetAllUsersRoute({ core, router, ExpressValidator });
	createUpdateUserByEmailRoute({ core, router, ExpressValidator });
	createGetUserByEmailRoute({ core, router, ExpressValidator });
	createDeleteUserByEmailRoute({ core, router, ExpressValidator });

	return router;
};

module.exports = {
	createUserRoute,
};