# Flappy Bird, Node/Express backend, and Oracle database
This repository contains a 3 part application stack. The front end is a Flappy Bird game written using Phaser.js. The backend is a Node/Express API which facilitates the connection between the front end and the database. The database is an Oracle Free 23ai instance based off of the official Docker image. Terraform IAC for OCI is also included.
## Quick Start
### To run locally:
```
docker-compose up
```
Then:

Navigate to http://localhost:8080 to see the Flappy Bird game

or

Start making API requests to http://localhost:3000

### To run in OCI
```
terraform init
terraform apply -auto-approve -target=module.oci
terraform apply -auto-approve -target=module.docker
```

Then:

Navigate to the IP address shown in the terminal output in your browser

or

Start making API requests to that same IP on port 3000

## Starting Over
Messed up? Need to start over? Just remove all containers and the Oracle DB volume and start from the beginning.
```
docker rm -rf $(docker ps -aq) &&
docker volume rm game-backend-oracle-db_oracledb &&
docker-compose up
```

or stop all containers and destroy all cloud infrastructure.

```
terraform destroy -auto-approve -target=module.docker && terraform destroy -auto-approve -target=module.oci
```

## Readings
If you're interested in reading an article corresponding to a particular topic, consier visiting the URLs below. Each link points to an article written by me, demonstrating how to use the corresponding feature:

* [JSON-relational duality views](https://www.linkedin.com/pulse/full-stack-javascript-app-utilizing-json-relational-duality-toscano-ffjde)
* [Advanced Queuing](https://www.linkedin.com/pulse/express-typescript-oracle-advanced-queue-michael-toscano-bmrje)
* [Creating cloud infrastructure with Terraform](https://www.linkedin.com/pulse/terraforming-nodejs-application-onto-oci-aws-michael-toscano-rcvqe)
* Deploying to OCI with Terraform (Coming soon)
