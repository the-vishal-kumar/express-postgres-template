/**
 * rollbar.js
 * Vishal Kumar
 */

'use strict';

const Rollbar = require(`rollbar`);

const { rollbarConfig } = require(`../../../config`);

module.exports = new Rollbar({
	accessToken: rollbarConfig.accessToken,
	captureUncaught: rollbarConfig.captureUncaught,
	captureUnhandledRejections: rollbarConfig.captureUnhandledRejections
});