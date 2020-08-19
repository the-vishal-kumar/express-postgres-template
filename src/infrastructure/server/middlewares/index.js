/**
 * middlewares/index.js
 * Vishal Kumar
 */

'use strict';

const rollbar = require('./rollbar');
const { rollbarConfig } = require('../../../../config');

module.exports = {
    rollbar: rollbarConfig.accessToken ? rollbar : {},
};