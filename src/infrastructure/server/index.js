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

const { rollbarConfig } = require(`../../config`);
const Middlewares = require(`./middlewares`);
const Routes = require(`./routes`);

const createApp = (sequelize) => {
	const core = createCore(sequelize);
    
	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParserJsonError());

	if (rollbarConfig.accessToken) app.use(Middlewares.rollbar.errorHandler());

	app.get(`/`, (req, res) => res.send(`
        Welcome to <strong>${Pack.name}</strong>.<br>
        Go to <a href='${Pack.repository.url}'>Github Repo</a>
        `)
	);

	const userRoutes = Routes.createUserRoute(core);
	app.use(`/users`, userRoutes);

	const notFoundRoute = Routes.createNotFoundRoute;
	app.use(notFoundRoute);

	return app;
};

module.exports = {
	createApp,
};