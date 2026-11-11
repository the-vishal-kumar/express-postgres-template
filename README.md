> **Archived (2020).** A template I wrote between August and November 2020, early in my career, while learning Express, Sequelize and Heroku deploys. It is kept as a record of where I started. It is not maintained, its dependencies are out of date, and it should not be deployed as-is. For how I structure a Node.js API today, see [nodejs-typescript-rest-boilerplate](https://github.com/the-vishal-kumar/nodejs-typescript-rest-boilerplate).

# express-postgres-template
Boilerplate application doing CRUD operations using NodeJs with Express framework, PostgreSQL as database, Sequelize as ORM. Application uses Rollbar and New Relic for error tracking, Postman APIs collection for testing APIs, and eslint, husky, and lint-staged for code-linting purposes.

    NodeJs v12.18.3
    PostgreSQL v12.4
    Sequelize v6.3.4

    Rollbar v2.19.2
    New Relic v6.12.0

    ESLint v7.7.0
    Husky v4.2.5
    Lint-Staged v10.2.11

    CircleCI
    Heroku

## Security note

Read this before copying any of the code.

- **Hard-coded database credentials.** `src/config.js` contains the local user and password, and production falls back to them when `DATABASE_URL` is missing.
- **TLS without verification.** Production connects to PostgreSQL with `rejectUnauthorized: false`, which Heroku Postgres needed at the time. It encrypts the connection but does not check who is on the other end.
- **Development wipes the database.** With `NODE_ENV=development` the app runs `sequelize.sync({ force: true })` on every start, which drops and recreates all tables.
- **No authentication.** Anyone who can reach the API can list, change and delete every user.
- **Every branch deploys.** `.circleci/config.yml` force-pushes any branch to the Heroku app, and puts the Heroku API key in the git remote URL.

Fixed during archiving:

- 500 responses used to include the raw Sequelize error, including the row that failed. They now return only a code and message, and the error goes to the error reporter.
- The development config always required TLS, so the quickstart failed against a local PostgreSQL. TLS is now opt-in in development with `DATABASE_SSL=true`.

## What I'd do differently today

- **Secrets from the environment only,** loaded from a secrets manager, with the app refusing to start when a required one is missing. No credentials in source, not even local ones.
- **Migrations, never `sync`.** Schema changes go through reviewed migrations that run once per deploy. `sync({ force: true })` has no place in shared code.
- **Validate at the edge with a schema** (for example zod or Joi) that also types the handler, and return one consistent error shape.
- **Authentication and authorisation** on every route that reads or changes user data.
- **Tests.** The template has none. I would add unit tests for the core, integration tests against a disposable PostgreSQL (Testcontainers), and run both in CI before any deploy.
- **Deploy from the main branch only,** build once and promote the same artefact through environments, with a short-lived, least-privilege deploy token.
- **Observability.** Structured JSON logs with request IDs, and OpenTelemetry traces and metrics instead of vendor-specific agents.

## Outdated advice in this README

Sections 4 to 7 describe tools as they were in 2020:

- Heroku ended free dynos and free Postgres in November 2022, so the steps below now need a paid plan.
- The `circleci/node:erbium` image is deprecated; CircleCI's current images are `cimg/node`.
- Section 7 uses your account-wide Heroku API key in CI. Today I would create a dedicated token with `heroku authorizations:create` and scope CI to one app.

## 1. Install [PostgreSQL](https://www.postgresql.org/download)

## 2. Install [pgAdmin 4](https://www.pgadmin.org/download) (GUI for PostgreSQL)

## 3. Accessing PostgreSQL through terminal
See the [tutorial](https://youtu.be/-LwI4HMR_Eg)

Summed up steps:-

- to enter postgres as sudo user
    - Run `sudo su postgres`
    - `[Enter sudo password]`
- Enter postgresql cli `psql`
- list databases `\l`
- list users `\du`
- change password of main user 'postgres' to 'postgres' `ALTER USER "postgres" WITH PASSWORD 'postgres';`
- add user named 'fun' with password 'gyaan' `CREATE USER "fun" WITH PASSWORD 'gyaan';`
- create database named 'express-postgres-template' with owner as 'fun' `CREATE DATABASE "express-postgres-template" OWNER "fun";`
- to exit cli `exit`
- to exit as super user `exit`

## 4. Generating [Rollbar](https://rollbar.com) Access Token
- Signup using Github or Login using your credentials
- Go to Projects. Create a new Project (Enter a name, choose timezone, etc)
- Choose Node.js as Primary Rollbar SDK
- Copy the accessToken and save it in .env file against ROLLBAR_ACCESS_TOKEN (See Starting the project for .env file location)

## 5. Generating [New Relic](https://newrelic.com) Licence Key
- Signup or Login using your credentials
- Click on Add More
- Choose Node JS under Back-end, front-end, and mobile applications
- Enter a Project name and download custom configuration file
- Open the downloaded file in any text editor and copy the value of 'license_key'
- Paste it against NEWRELIC_LICENCE_KEY in .env file (See Starting the project for .env file location)

## 6. Starting the project on local machine
- Make copy of .env.sample as .env in root directory
- Leave `DATABASE_SSL=false` for a local PostgreSQL; set it to `true` if your database requires TLS
- Generate a Rollbar access token (optional, see step 4)
- Generate a New Relic licence key (optional, see step 5)
- Open Terminal in root directory of project and run following commands:
    - `npm i`
    - `npm run db:migrate`
    - `npm run start`
- Test the APIs using Postman API Collection
    - open postman
    - import 'express-postgres-template.postman_collection.json' placed in the root directory
    - once the server is running, send the CRUD requests one by one

## 7. [CircleCI](https://circleci.com) and [Heroku](https://heroku.com)
- `Heroku` Step 1
    - Signup on `Heroku` using your email
    - Create a new pipeline
        - Name the pipeline - any of your choice
        - Don't connect the pipeline with any github repo
        - Click on `Create Pipeline`
    - Create Staging App to pipeline
        - Click on `Add App`
        - Write unique name for staging app `App name`
        - Choose `Region` of your choice
        - Click on `Create App`
    - Copy Heroku API Key
        - Go to Account Settings
        - Reveal and copy `API Key`
- `CircleCI` Step 2
    - Signup or Login on `CircleCI` using Github or Bitbucket account
    - If you're part of multiple organisations, choose your organisation
    - Under Projects section, follow the repository
    - `config.yml` is already located in the `.circleci` folder
    - In project settings, add following environment variables
        - HEROKU_APP_NAME = `App name`
        - HEROKU_API_KEY = `API Key`
- `Heroku` Step 3
    - Again login to `Heroku`
    - Go to the staging app
    - Go to Settings
    - Add Buildpack
        - Choose NodeJs
        - Save changes
    - Add Environment Variables
        - Click on `Reveal Config Vars`
        - Add key value pairs of all the variables listed in .env.sample of this project
- App will be deployed whenever you make another commit to the master branch

## Contact Author
#### Email vishal194kumar@gmail.com
#### Follow https://twitter.com/the_vishalkr
