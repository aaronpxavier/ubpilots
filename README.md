# UB Pilots API
## API backend for the UB Pilots Site

### Technology

* NodeJS (node)
* ExpressJS (server)
* Nginx (web server/reverse proxy/load balancer)
* PM2 (production process manager)
* MongoDB (database)
* Mongoose (mongodb orm)
* Jest (test runner)
* Babel (transpiler from ES6 to ES5)
* Gulp (automation runner)

## Development Setup

### Install all Dependencies 
Run `npm install` - installs all dependencies contained in package.json

### Build
Run `npm run build` - Compiles JS files in the /src directory from ES6 to browser ready ES5 and writes them to /dist.

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

## License

MIT License

Copyright (c) 2018 UBPA (University at Buffalo Pilot's Association)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
