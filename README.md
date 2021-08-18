# Node-Server

## Project
This is a Node.js server, made in "serverside scripting" at TEC by Jonas Fuhlendorff.

Getting started with the project: 

<strong>Build project:</strong> \
``npm install``

<strong>Start database:</strong> \
See MongoDB section.

<strong>Run project:</strong> \
``npm start``


## Endpoints
 http://localhost:8000/index.html

## API
The API base route for the API is: \
http://localhost:8000/api/

The calls are structuret like the two examples bellow.

http://localhost:8000/api/{resource}/

http://localhost:8000/api/{resource}/{param)}

### Postman
All API commands can be "imported" to postman by the script in {root}/infra/postman/Node-Server.postman_collection.json. This script contains all possible routs and commands, the API contains.

## MongoDB.

The projects database is a MongoDB running in a docker container. To start the docker container, look at the "Docker commands" section.

Connection string: ``mongodb://localhost:27017/?readPreference=primary&appname=mongodb-vscode%200.6.10&directConnection=true&ssl=false``

### Docker Commands

<strong>Start MongoDB container:</strong> \
Open Powershell and cd to the {root}/infra/docker folder and run compose file with command ``docker-compose up``

<strong>Stop Mongo container:</strong> \
Open Powershell and cd to the {root}/infra/docker folder and run ``docker-compose down``

<strong>Remove Mongo container:</strong> \
Open Powershell and run ``docker container rm {container id}``