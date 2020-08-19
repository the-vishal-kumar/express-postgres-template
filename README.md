# nodejs-postgres-template
#### NodeJs v12.18.3
#### PostgreSQL v12.4
#### Sequelize v6.3.4
#### Rollbar v2.19.2

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

## Starting the project
- npm i
- npm run start

## Postman API Test Cases
- open postman
- import 'nodejs-postgres-template.postman_collection.json' placed in the root directory
- once the server is running, send the CRUD requests one by one

## Contact Author
#### Email vishal194kumar@gmail.com
#### Follow https://twitter.com/the_vishalkr