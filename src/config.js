/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();

// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || `development`;
// eslint-disable-next-line no-undef
const serverPort = process.env.serverPort || 8000;
// eslint-disable-next-line no-undef
const postgrePort = process.env.postgrePort || 5432;
// eslint-disable-next-line no-undef
const rollbarAccessToken = process.env.rollbarAccessToken || ``;
const Pack = require(`../package.json`);

const config = {
	development: {
		serverConfig: {
			host: `localhost`,
			port: serverPort,
		},
		postgreConfig: {
			userName: `fun`,
			password: `gyaan`,
			host: `localhost`,
			port: postgrePort,
			dbName: Pack.name,
		},
		rollbarConfig: {
			accessToken: rollbarAccessToken,
			captureUncaught: true,
			captureUnhandledRejections: true,
			reportErrorRequest: true,
		},
	},
};

module.exports = config[env];