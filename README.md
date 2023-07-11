# Dog-API
This is a recreation of the Dog CEO API made using Node.js, Express and PostgreSQL.

## Capabilities
This app has implemented the following capabilities:
* Get a list of all the breeds in the database.
* Get a random image of a requested breed (optionally with subbreed)
* Add a breed (optionally with subbreeds)
* Add an image associated with a breed (optionally with its subbreed) 

## Requirements for running the app locally
* Node.js version 18 or above
* PostgreSQL 15
* Postman for working with the APIs

## Requirements for running the app with Docker
* Docker Desktop (Windows)
* Postman

## Setting up the app locally
In order to set up the app locally, follow these steps: 
* Open the app directory
* Modify the `.env` file to match the parameters of your PostgreSQL credentials
* Open the app directory in a terminal
* Run these commands in order:
  * `npm install` for installing the required dependencies
  * `node seed` for creating and populating the database
  * `node ./server.js` to start the server

After following these steps the server should be running and ready for use.

## Setting up the app via Docker (use the repository from the `dockerized` branch)
In order to set up the app via Docker, follow these steps: 
* Open the app directory
* Modify the `.env` file to match the parameters of your desired PostgreSQL credentials, 
  however you must ensure that the changes are appropriately carried over in `docker-compose.yml` too, specifically in `services:app:environment:DATABASE_URL`, 
  `services:postgres:ports` and `services:postgres:environment`. Making changes is not required since the build will succeed with the defaults.
* Open the app directory in a terminal
* Run the `docker-compose up --build -d` to build, initialize and start the database and the server from their respective docker containters

After following these steps the server should be running and ready for use.

## Postman Collection
In order to explore the server's APIs and what they can do, a [Postman collection](https://www.postman.com/aj28824/workspace/dog-api/overview)
is published with ready requests for easier navigation.

I hope you find this project satisfactory and enjoy it!
