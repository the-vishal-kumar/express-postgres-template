# express-postgres-template
Boilerplate application doing CRUD operations using NodeJs with Express framework, PostgreSQL as database, Sequeslize as ORM. Application uses Rollbar and New Relic for error tracking, Postman APIs collection for testing APIs, and eslint, husky, and lint-staged for code-linting purposes.

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
- Generate Rollbar Access Token (Optional Step 4)
- Generate NewRelic Licence Key (Optional Step 3)
- Open Terminal in root directory of project and run following commands:
    - `npm i`
    - `npm run db:migrate`
    - `npm run start`
- Test the APIs using Postman API Collection
    - open postman
    - import 'express-postgres-template.postman_collection.json' placed in the root directory
    - once the server is running, send the CRUD requests one by one

## 7. [CircleCI](https://circleci.com) and [Hroku](https://heroku.com)
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