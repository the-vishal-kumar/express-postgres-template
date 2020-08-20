/**
 * rollbar.js
 * Vishal Kumar
 */

'use strict';

const Rollbar = require(`rollbar`);

const { rollbarConfig: { accessToken, captureUncaught, captureUnhandledRejections, reportErrorRequest } } = require(`../../../config`);

const errorReporter = accessToken ?
	new Rollbar({
		accessToken,
		captureUncaught,
		captureUnhandledRejections,
	})
	:
	console;

module.exports = {
	reportError: (err, req) => errorReporter.error(err, reportErrorRequest ? req : null),
};