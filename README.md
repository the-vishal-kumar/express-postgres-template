# nodejs-postgres-template
#### NodeJs v12.18.3
#### PostgreSQL v12.4
#### Sequelize v6.3.4
#### ************
#### Rollbar v2.19.2
#### New Relic v6.12.0
#### ************
#### ESLint v7.7.0
#### Husky v4.2.5
#### Lint-Staged v10.2.11
#### ************
#### CircleCI
#### Heroku

## Installing PostgreSQL
Go to https://www.postgresql.org/download and download according to your operating system

## Install pgAdmin (GUI for PostgreSQL)
Go to https://www.pgadmin.org/download and download according to your operating system

## Accessing PostgreSQL through terminal
See the tutorial https://youtu.be/-LwI4HMR_Eg

Summed up steps:-

- to enter postgres as sudo user
    - sudo su postgres
    - [Enter sudo password]
- Enter postgresql cli
    - psql
- list databases
    - \l
- list users
    - \du
- change password of main user 'postgres' to 'postgres'
    - ALTER USER "postgres" WITH PASSWORD "postgres";
- add user named 'fun' with password 'gyaan'
    - CREATE USER "fun" WITH PASSWORD "gyaan";
- create database named 'nodejs-postgres-template' with owner as 'fun'
    - CREATE DATABASE "nodejs-postgres-template" OWNER "fun";
- to exit cli
    - exit
- to exit as super user
    - exit

## Generating Rollbar Access Token
- Signup using Github or Login using your credentials
- Go to Projects. Create a new Project (Enter a name, choose timezone, etc)
- Choose Node.js as Primary Rollbar SDK
- Copy the accessToken and save it in .env file against ROLLBAR_ACCESS_TOKEN (See Starting the project for .env file location)

## Generating New Relic Licence Key
- Signup or Login using your credentials
- Click on Add More
- Choose Node JS under Back-end, front-end, and mobile applications
- Enter a Project name and download custom configuration file
- Open the downloaded file in any text editor and copy the value of 'license_key'
- Paste it against NEWRELIC_LICENCE_KEY in .env file (See Starting the project for .env file location)

## Starting the project
- Make copy of .env.sample as .env in root directory
- Generate Rollbar Access Token (Optional)
- Generate NewRelic Licence Key (Optional)
- Open Terminal in root directory of project and run following commands:
    - npm i
    - npm run start

## Postman API Test Cases
- open postman
- import 'nodejs-postgres-template.postman_collection.json' placed in the root directory
- once the server is running, send the CRUD requests one by one

## Contact Author
#### Email vishal194kumar@gmail.com
#### Follow https://twitter.com/the_vishalkr