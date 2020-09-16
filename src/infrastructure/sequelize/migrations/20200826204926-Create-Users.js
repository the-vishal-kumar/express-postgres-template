/**
 * 20200903081310-Create-Posts.js
 * Vishal Kumar
 */

'use strict';

module.exports = {
	up: async (queryInterface, { STRING, INTEGER }) => await queryInterface.createTable(`User`, {
		userId: {
			allowNull: false,
			primaryKey: true,
			type: INTEGER,
			autoIncrement: true,
		},
		email: {
			type: STRING,
			allowNull: false,
			unique: true,
		},
	}),
	down: async (queryInterface) => await queryInterface.dropTable(`User`),
};