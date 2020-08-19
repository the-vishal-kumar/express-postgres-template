/**
 * config.js
 * Vishal Kumar
 */

'use strict';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const Pack = require('./package.json');

const config = {
    development: {
        serverConfig: {
            host: 'localhost',
            port: process.env.serverPort || 8000,
        },
        postgreConfig: {
            userName: `fun`,
            password: `gyaan`,
            host: 'localhost', // default host
            port: process.env.postgrePort || '5432', // default port
            dbName: Pack.name
        },
        rollbarConfig: {
            accessToken: process.env.rollbarAccessToken || '',
            captureUncaught: true,
            captureUnhandledRejections: true
        },
    },
};

module.exports = config[env];