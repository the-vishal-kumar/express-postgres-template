/**
 * src/index.js
 * Vishal Kumar
 */

/* eslint-disable no-undef */
'use strict';

let nodeVersion = parseInt(process.versions.node);
if (nodeVersion < 12) throw (`Please upgrade Node version to 12 or higher`);

require(`dotenv`).config();
const NEWRELIC_LICENCE_KEY = process.env.NEWRELIC_LICENCE_KEY || ``;
if (NEWRELIC_LICENCE_KEY) require(`newrelic`);

const { sequelizeInfra: { createSequelize }, serverInfra: { createApp } } = require(`./infrastructure`);
const { serverConfig: { port } } = require(`./config`);

const start = async () => {
	const sequelize = await createSequelize();
	const sequelizeConfig = sequelize.db.config;
	console.log(`Sequelize connected to ${sequelizeConfig.host}:${sequelizeConfig.port}/${sequelizeConfig.database}`);

	const app = createApp({ sequelize });

	const server = app.listen(port, () => {
		console.log(`Server listening on localhost:${port}`);
	});

	const gracefulExit = async () => {
		try {
			await Promise.all([
				await sequelize.close(),
				await server.close(),
			]).then(() => {
				process.exit(0);
			});
		} catch (error) {
			console.log(`Unable to gracefully exit =>`, error);
			process.exit(1);
		}
	};

	process.on(`SIGINT`, gracefulExit);
	process.on(`SIGTERM`, gracefulExit);
	process.on(`unhandledRejection`, (err) => {
		console.log(`unhandledRejection===>`, err);
		process.exit(1);
	});
};

start();