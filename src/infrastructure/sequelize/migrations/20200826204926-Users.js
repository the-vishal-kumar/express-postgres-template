'use strict';

module.exports = {
	up: async (queryInterface, { STRING, INTEGER }) => {
		/**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
		return await queryInterface.createTable(`User`, {
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
		});
	},
	down: async (queryInterface) => {
		/**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
		return await queryInterface.dropTable(`User`);
	}
};