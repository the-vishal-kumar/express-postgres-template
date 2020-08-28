/**
 * user/index.js
 * Vishal Kumar
 */

'use strict';

const { createAddUser } = require(`./add-user`);
const { createGetAllUsers } = require(`./get-all-users`);
const { createUpdateUserByEmail } = require(`./update-user-by-email`);
const { createGetUserByEmail } = require(`./get-user-by-email`);
const { createDeleteUserByEmail } = require(`./delete-user-by-email`);

const createUserCore = ({ sequelize }) => {
	const addUser = createAddUser({ sequelize });
	const getAllUsers = createGetAllUsers({ sequelize });
	const updateUserByEmail = createUpdateUserByEmail({ sequelize });
	const getUserByEmail = createGetUserByEmail({ sequelize });
	const deleteUserByEmail = createDeleteUserByEmail({ sequelize });

	return {
		addUser,
		getAllUsers,
		updateUserByEmail,
		getUserByEmail,
		deleteUserByEmail,
	};
};

module.exports = {
	createUserCore,
};