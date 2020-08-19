/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const highlightSql = require('sequelize-log-syntax-colors');
const { format } = require('sql-formatter');
const { postgreConfig } = require('../../../config');

const config = {
    development: {
        username: postgreConfig.userName,
        password: postgreConfig.password,
        database: postgreConfig.dbName,
        host: postgreConfig.host,
        dialect: 'postgres',
        logging: text => console.log(highlightSql(format(text))),
        sync: true,
        ssl: true,
    },
};

module.exports = config[env];