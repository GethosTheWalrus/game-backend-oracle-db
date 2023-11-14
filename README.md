# Flappy Bird, Node/Express backend, and Oracle database
This repository contains a 3 part application stack. The front end is a Flappy Bird game written using Phaser.js. The backend is a Node/Express API which facilitates the connection between the front end and the database. The database is an Oracle Free23c instance based off of the official Docker image.
## Quick Start
First run:
```
docker-compose up
```
Then:

Navigate to http://localhost:8080 to see the Flappy Bird game

or

Start making API requests to http://localhost:3000

## Starting Over
Messed up? Need to start over? Just remove all containers and the Oracle DB volume and start from the beginning.
```
docker rm -rf $(docker ps -aq) &&
docker volume rm oracledb_oracledb &&
docker-compose up
```
