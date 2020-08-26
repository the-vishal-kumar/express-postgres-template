/**
 * sequelize/index.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();
const Sequelize = require(`sequelize`);

const { postgreConfig: { dialect, username, password, host, port, database } } = require(`../../config`);
const { logging, ssl, dialectOptions } = require(`./config`);
const { User: { createUserModel } } = require(`./models`);

const createSequelize = async () => {
	// eslint-disable-next-line no-undef
	let dbUrl = process.env.DATABASE_URL || `${dialect}://${username}:${password}@${host}:${port}/${database}`;

	const sequelize = new Sequelize(dbUrl, {
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

	if (sequelize.sync) await sequelize.sync({ force: true });

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