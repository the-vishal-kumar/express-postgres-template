/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();

// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || `development`;
const Pack = require(`../package.json`);

const config = {
	development: {
		serverConfig: {
			host: `localhost`,
			// eslint-disable-next-line no-undef
			port: process.env.serverPort || 8000,
		},
		postgreConfig: {
			userName: `fun`,
			password: `gyaan`,
			host: `localhost`, // default host
			// eslint-disable-next-line no-undef
			port: process.env.postgrePort || `5432`, // default port
			dbName: Pack.name
		},
		rollbarConfig: {
			// eslint-disable-next-line no-undef
			accessToken: process.env.rollbarAccessToken || ``,
			captureUncaught: true,
			captureUnhandledRejections: true
		},
	},
};

module.exports = config[env];