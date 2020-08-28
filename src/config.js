/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();

/* eslint-disable no-undef */
const NODE_ENV = process.env.NODE_ENV || `development`;
const PORT = process.env.PORT || 8000;
const POSTGRE_PORT = process.env.POSTGRE_PORT || 5432;
const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_ACCESS_TOKEN || ``;

const Pack = require(`../package.json`);

const config = {
	development: {
		serverConfig: {
			port: PORT,
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
			accessToken: ``,
			captureUncaught: true,
			captureUnhandledRejections: true,
			reportErrorRequest: true,
		},
	},
	production: {
		serverConfig: {
			port: PORT,
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

module.exports = config[NODE_ENV];