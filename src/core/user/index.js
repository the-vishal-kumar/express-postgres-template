/**
 * user/index.js
 * Vishal Kumar
 */

'use strict';

const { createAddUser } = require('./add-user');

const createUserCore = (sequelize) => {
    const addUser = createAddUser(sequelize);

    return {
        addUser,
    };
};

module.exports = {
    createUserCore,
};