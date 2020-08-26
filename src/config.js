/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();

// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || `development`;
// eslint-disable-next-line no-undef
const serverPort = process.env.PORT || 8000;
// eslint-disable-next-line no-undef
const POSTGRE_PORT = process.env.POSTGRE_PORT || 5432;
// eslint-disable-next-line no-undef
const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_ACCESS_TOKEN || ``;
const Pack = require(`../package.json`);

const config = {
	development: {
		serverConfig: {
			port: serverPort,
		},
		postgreConfig: {
			username: `fun`,
			password: `gyaan`,
			host: `localhost`,
			port: POSTGRE_PORT,
			database: Pack.name,
			dialect: `postgres`,
		},
		rollbarConfig: {
			accessToken: ROLLBAR_ACCESS_TOKEN,
			captureUncaught: true,
			captureUnhandledRejections: true,
			reportErrorRequest: true,
		},
	},
};

module.exports = config[env];