/**
 * infrastructure/index.js
 * Vishal Kumar
 */

'use strict';

const sequelizeInfra = require(`./sequelize`);
const serverInfra = require(`./server`);

module.exports = {
	sequelizeInfra,
	serverInfra,
};