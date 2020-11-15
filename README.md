# Alnk - a web url shortener with custom slugs, https://alnk.link

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Installing dependencies
1. Install angular-cli: `npm install -g @angular/cli`
2. Install MongoDB: `https://docs.mongodb.com/manual/administration/install-community/`
3. Install Redis: 
   - Download at `https://redis.io/topics/quickstart`, or
   - Install Docker Desktop and run a Redis image.
     1. Install Docker Desktop: `https://www.docker.com/products/docker-desktop`
     2. Open command prompt and run:  `docker pull redis`
     3.  Create and run a docker image on port 6379 named redis1: `docker run -d -p 6379:6379 --name redis1 redis`

## Development on local machine 
1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The app contains a proxy setting in the `angular.json` so that any api call to `/` is routed to `http://localhost:3080`.

2. Run `npm run dev` to run nodemon backend server on `http://localhost:3080`.
    - For routes to successfully work locally create a `.env` file in the source dir with the following: 
      - MONGO_URI='mongodb://127.0.0.1:27017'
      - REDIS_URL=''
      
      By default, redis npm is hosted at 127.0.0.1 on port 6379, so the above variable does not have to be set but in production these variables will be set in config vars.

By default the node server serves the application files after it is built in the `dist` directory. However, through the previous steps we can develop the frontend and backend separately on `http:localhost:4200` and `http:localhost:3080` respectively without having to run `ng build` to create the build artifacts and see our changes.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
