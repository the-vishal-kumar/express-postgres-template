/**
 * core/index.js
 * Vishal Kumar
 */

'use strict';

const { createUserCore } = require(`./user`);

const createCore = ({ sequelize }) => {
	const User = createUserCore({ sequelize });

	return {
		User,
	};
};

module.exports = {
	createCore,
};