/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require(`dotenv`).config();

// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV || `development`;
const highlightSql = require(`sequelize-log-syntax-colors`);
const { format } = require(`sql-formatter`);
const { postgreConfig: { dialect, username, password, database, host, port } } = require(`../../config`);

const config = {
	development: {
		// eslint-disable-next-line no-undef
		url: process.env.DATABASE_URL || `${dialect}://${username}:${password}@${host}:${port}/${database}`,
		logging: text => console.log(highlightSql(format(text))),
		sync: true, // Resets the database
		ssl: true,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	production: {
		// eslint-disable-next-line no-undef
		url: process.env.DATABASE_URL || `${dialect}://${username}:${password}@${host}:${port}/${database}`,
		logging: false,
		sync: false,
		ssl: true,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};

module.exports = config[NODE_ENV];