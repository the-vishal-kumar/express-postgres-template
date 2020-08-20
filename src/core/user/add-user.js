/**
 * add-user.js
 * Vishal Kumar
 */

'use strict';

const createAddUser = ({ sequelize }) => {
	const { models: { User } } = sequelize;

	const addUser = async ({ email }) => {
		const user = await User.create({ email });
		return {
			userId: user.userId,
			email: user.email,
		};
	};

	return addUser;
};

module.exports = {
	createAddUser,
};