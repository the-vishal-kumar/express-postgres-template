/**
 * sequelize/index.js
 * Vishal Kumar
 */

'use strict';

const Sequelize = require(`sequelize`);

const { postgreConfig } = require(`../../config`);
const sequelizeConfig = require(`./config`);
const { User: { createUserModel } } = require(`./models`);

const createSequelize = async () => {
	let dbUrl = `${sequelizeConfig.dialect}://${postgreConfig.userName}:${postgreConfig.password}@${postgreConfig.host}:${postgreConfig.port}/${postgreConfig.dbName}`;

	const sequelize = new Sequelize(dbUrl, {
		dialect: sequelizeConfig.dialect,
		logging: sequelizeConfig.logging,
		ssl: sequelizeConfig.ssl,
	});

	// Create Models
	const User = createUserModel({sequelize, Sequelize});

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