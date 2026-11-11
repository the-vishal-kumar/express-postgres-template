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

// A local PostgreSQL install usually has TLS off, so development only uses
// TLS when DATABASE_SSL=true. Production always requires it.
// eslint-disable-next-line no-undef
const developmentSsl = process.env.DATABASE_SSL === `true`;

const config = {
	development: {
		// eslint-disable-next-line no-undef
		url: process.env.DATABASE_URL || `${dialect}://${username}:${password}@${host}:${port}/${database}`,
		logging: text => console.log(highlightSql(format(text))),
		sync: true, // Resets the database
		ssl: developmentSsl,
		dialectOptions: developmentSsl ? {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		} : {},
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