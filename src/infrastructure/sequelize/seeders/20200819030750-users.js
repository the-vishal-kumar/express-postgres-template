/**
 * seeders/20200819030750-users.js
 * Vishal Kumar
 */

'use strict';

const users = require('./data/users');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('User', users, {}),
  down: queryInterface => queryInterface.bulkDelete('User', null, {}),
};