/**
 * 20200916101421-seed-users.js
 * Vishal Kumar
 */

'use strict';

const { users } = require(`./data`);

module.exports = {
	up: async (queryInterface) => {
		return await queryInterface.bulkInsert(`User`, users, {});
	},
	down: async (queryInterface) => {
		return await queryInterface.bulkDelete(`User`, null, {});
	}
};