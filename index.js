/**
 * ./index.js
 * Vishal Kumar
 */

'use strict';

let nodeVersion = parseInt(process.versions.node);
if (nodeVersion < 12) throw ('Please upgrade Node version to 12 or higher');

const { sequelizeInfra: { createSequelize }, serverInfra: { createApp } } = require('./src/infrastructure');
const { port } = require('./config').serverConfig;

const start = async () => {
    const sequelize = await createSequelize();
    const sequelizeConfig = sequelize.db.config;
    console.log(`Sequelize connected to ${sequelizeConfig.host}:${sequelizeConfig.port}/${sequelizeConfig.database}`);

    const app = createApp(sequelize);

    const server = app.listen(port, () => {
        console.log(`Server listening on localhost:${port}`);
    });

    const gracefulExit = async () => {
        try {
            await Promise.all([
                await sequelize.close(),
                await server.close(),
            ]).then((resolvedValues) => {
                process.exit(0);
            });
        } catch (error) {
            console.log('Unable to gracefully exit =>', error);
            process.exit(1);
        }
    };

    process.on('SIGINT', gracefulExit);
    process.on('SIGTERM', gracefulExit);
    process.on('unhandledRejection', (err) => {
        console.log('unhandledRejection===>', err);
        process.exit(1);
    });
};

start();