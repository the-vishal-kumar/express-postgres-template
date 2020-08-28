/**
 * update-user-by-email.js
 * Vishal Kumar
 */

'use strict';

const createUpdateUserByEmail = ({ sequelize }) => {
	const { models: { User } } = sequelize;

	const updateUser = async ({ email, newEmail }) => {
		const criteria = { where: { email } };
		const dataToUpdate = { email: newEmail };
		await User.update(dataToUpdate, criteria);
		return;
	};

	return updateUser;
};

module.exports = {
	createUpdateUserByEmail,
};