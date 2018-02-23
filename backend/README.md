# UB Pilots API
## API backend for the UB Pilots Site

### Technology

* NodeJS (node)
* ExpressJS (server)
* MongoDB (database)
* Mongoose (mongodb orm)
* Jest (test runner)
* Babel (transpiler from ES6 to ES5)
* Gulp (automation runner)

## Development Setup

### Install All Dependencies
Run `npm install` - installs all dependencies contained in package.json

### Build
Run `npm run build` - Compiles JS files in the /src directory from ES6 to browser ready ES5 and writes them to /dist.

### Start Dev Server
Run `npm run start` - starts development server. 

## Production Setup
### Instructions
1. Copy all content inside /dist to production server.

2. Run `npm install --production` - installs dependencies excluding dev dependencies.

3. Run `PM2 start server.js`

## Dev Tools
### Run Test
Run `npm run test` - Uses Jest to run tests located in the /src/\__tests\__ directories.

### Development Server
Run `npm run start` - Starts up the ExpressJS server (./dist/server.js) locally.

### Deploy to Production Server
Run `npm run deploy` - deploys es5 files in dist/ to remote server. must configure a remote_conn.json file first.

