/**
 * get-user-by-email.js
 * Vishal Kumar
 */

'use strict';

const createGetUserByEmail = ({ sequelize }) => {
	const { models: { User } } = sequelize;

	const getUserByEmail = async ({ email }) => {
		const criteria = {
			where: { email }
		};
		const user = await User.findAll(criteria);
		return { user };
	};

	return getUserByEmail;
};

module.exports = {
	createGetUserByEmail,
};