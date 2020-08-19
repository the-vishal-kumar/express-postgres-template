/**
 * add-user.js
 * Vishal Kumar
 */

'use strict';

const createAddUser = (sequelize) => {
    const { models: { User } } = sequelize;

    const addUser = async ({email}) => {
        try {
            const user = await User.create({ email });
            return {
                userId: user.userId,
                email: user.email,
            };
        } catch (error) {
            throw error;
        }
    };

    return addUser;
};

module.exports = {
    createAddUser,
};