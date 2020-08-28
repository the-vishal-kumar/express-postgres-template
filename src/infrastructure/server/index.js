/**
 * server/index.js
 * Vishal Kumar
 */

'use strict';

const express = require(`express`);
const bodyParser = require(`body-parser`);
const bodyParserJsonError = require(`express-body-parser-json-error`);

const { createCore } = require(`../../core`);
const Pack = require(`../../../package.json`);
const { rollbar: { reportError } } = require(`./middlewares`);
const { createUserRoute, createNotFoundRoute, createErrorRoute } = require(`./routes`);

const createApp = ({ sequelize }) => {
	const core = createCore({ sequelize });

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParserJsonError());

	app.get(`/`, (req, res) => res.send(`
	Welcome to <strong>${Pack.name}</strong>.<br>
	Go to <a href='${Pack.repository.url}'>Github Repository</a><br>
	Contact author <a href='https://www.linkedin.com/in/the-vishal-kumar/'>${Pack.author}</a>
	`)
	);

	const userRoutes = createUserRoute({ core });
	app.use(`/users`, userRoutes);

	const notFoundRoute = createNotFoundRoute();
	app.use(notFoundRoute);

	// Error Handling - Rollbar
	// Method 1: following will kill the app in case of error
	// app.use(rollbar.errorHandler());
	// Method 2: following will not kill the app, instead will send server error
	const errorRoute = createErrorRoute({ reportError });
	app.use(errorRoute);

	return app;
};

module.exports = {
	createApp,
};