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
const { postgreConfig: { username, password, database, host, dialect } } = require(`../../config`);

const config = {
	development: {
		username,
		password,
		database,
		host,
		logging: text => console.log(highlightSql(format(text))),
		sync: true,
		native: true,
		ssl: true,
		dialect,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};

module.exports = config[NODE_ENV];