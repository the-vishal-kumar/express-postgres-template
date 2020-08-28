/**
 * get-all-users.js
 * Vishal Kumar
 */

'use strict';

const createGetAllUsers = ({ sequelize }) => {
	const { models: { User } } = sequelize;

	const getAllUsers = async () => {
		const user = await User.findAll({});
		return { user };
	};

	return getAllUsers;
};

module.exports = {
	createGetAllUsers,
};