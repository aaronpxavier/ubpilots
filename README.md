# Pilots_API

## Master Branch

API backend for the UB Pilots Site

### Technology

* NodeJS (node)
* ExpressJS (server)
* Mongoose (mongodb orm)
* Jest (test runner)
* Babel (transpiler from ES6 to ES5)
* Gulp (automation runner)

### Commands

## Must run first 
Run `npm install` - installs all dependencies contained in package.json

## Build
Run `npm run build` - Compiles JS files in the /src directory from ES6 to browser ready ES5 and writes them to /dist.

## Unit Test
Run `npm run test` - Uses Jest to run tests located in the /src/__tests__ directory.

## Development Server 
Run `npm run start` - Starts up the ExpressJS server (./dist/server.js) locally.

## Deploy to Production Server
Run `npm run deploy` - deploys es5 files in dist/ to remote server. must configure a remote_conn.json file first.
