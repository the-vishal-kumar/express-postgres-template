/**
 * sequelize/index.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();
const Sequelize = require(`sequelize`);

const { postgreConfig: { dialect } } = require(`../../config`);
const { url, logging, ssl, dialectOptions, sync } = require(`./config`);
const { User: { createUserModel } } = require(`./models`);

const createSequelize = async () => {
	const sequelize = new Sequelize(url, {
		dialect,
		logging,
		ssl,
		dialectOptions
	});

	// Create Models
	const User = createUserModel({ sequelize, Sequelize });

	// Associate Models
	const models = {
		User,
	};
	Object.values(models).forEach(model => {
		if (typeof model.associate !== `function`) {
			return;
		}
		model.associate(models);
	});

	if (sync) await sequelize.sync({ force: true });

	return {
		db: sequelize,
		models,
		close: () => sequelize.connectionManager.close(),
		truncate: async () => {
			await User.truncate({ cascade: true });
			await Promise.all(
				Object.values(models)
					// truncating HC and Driver (with a cascade) in parallel introduces deadlocks,
					.filter(m => ![User].includes(m))
					.map(model => model.truncate({ cascade: true })),
			);
		},
	};
};

module.exports = {
	createSequelize,
};