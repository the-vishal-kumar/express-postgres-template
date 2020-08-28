/**
 * delete-user.js
 * Vishal Kumar
 */

'use strict';

const createDeleteUserByEmail = ({ sequelize }) => {
	const { models: { User } } = sequelize;

	const deleteUserByEmail = async ({ email }) => {
		const criteria = { where: { email } };
		const user = await User.destroy(criteria);
		return { user };
	};

	return deleteUserByEmail;
};

module.exports = {
	createDeleteUserByEmail,
};