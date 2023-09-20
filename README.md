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

### Pre-requirements: ###
* [NodeJS](https://nodejs.org/en)
* [Docker](https://www.docker.com/)
* [Kubernetes](https://kubernetes.io/) (can be installed from the docker desktop clients in Settings)
* [Ingress-nginx-controller](https://kubernetes.github.io/ingress-nginx/deploy/) (quick install-> if you don't have helm)
* Modify the hosts file: Windows location: C:\Windows\System32\drivers\etc\hosts  add the entry on a new line at the end of the file: "127.0.0.1 ticketing.dev".
* Having two secrets configured in kubernetes locally:
   * jwt-secret: kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<< insert any string >>
   * stripe-secret: create secret generic stripe-secret --from-literal=STRIPE_KEY=<< insert secret key obtained from [stripe](https://dashboard.stripe.com/test/apikeys) >>

### Start-up ###
Open a terminal window and go to the rootfolder of this project. Run the following line:

   `skaffold dev`
   
Wait for the services to run. On the first run you may get some erros which should be fixed by stopping the process and running the command again.
You can access the application at **ticketing.dev** in your browser.



(Note: this repository was created recently for keeping all of the services together. On my github profile there is a public repo for each one of the services, which is way older than this one)

