# GetTickets

## App description
This application is made to help users sell tickets. A user can create an account and create a listing for a ticket, while some other user will purchase it from him.


## Technologies used
The app consists of 5 microservices, create using NodeJS environment, ExpressJs framework and the Typescript Language. The front end is created using NextJS with the Javascript language.


## Service description
* The authentication service is created from scratch for practice purposes, using JWT tokens.
* The front end is using NextJS to make use of the server side rendering
* The expiration service purpose is to emit an event when the order has expired, to forbid the user to pay after the time elapsed
* The infra folder contains the kubernetes configurations for each service.
* The orders service is responsible for creating an order which is tied to a user and a ticket
* The payment service is using the Stripe api in test mode for processing payments
* The tickets service purpose is to create tickets.


## Architectural choices
* Each service which requires a database is using MongoDB, expect for the expiration service which is using Redis
* The system uses an event based architecture, making use of an message queue, node nats streaming server
* A load balancer is used: nginx-ingress
* The services make use of a custom common library which is published as an npm module to reduce code replication. It contains
    * custom errors
    * event data
    * different middlewares: current-user data, error handling, validate request for error normalization, etc.


## Get started
To start up the project open a terminal window and go to the rootfolder of this project. Run the following line:

`skaffold dev`

(Note: this repository was created recently for keeping all of the services together. On my github profile there is a public repo for each one of the services, which is way older than this one)

