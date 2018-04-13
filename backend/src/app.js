/**
 * API Application
 *
 */
// Imports ------------------------------------------------------------------//
import express from '../node_modules/express'; // web server
import parser from '../node_modules/body-parser'; // http request parser
import morgan from '../node_modules/morgan'; // logger
import mongoose from '../node_modules/mongoose'; //mongoose middleware
import config from './cfg'; // application configuration
import formEndpoints from './routes/form_endpoints'; // version 1 routes
import loginEndpoints from './routes/login_endpoints'; // version 1 routes
import logbookEndpoints from './routes/logbook_endpoints';
import seed from './utility/seed';
// Variables ----------------------------------------------------------------//

const app = express(); // our express application
//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(config.db_host);
// Express Application Setup ------------------------------------------------//

// Seed admin and regular user;
seed();

// logging
app.use(morgan(config.mode));

// default status code
app.use((req,res,next)=>{
    res.status(200);
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next(); // forward to next middleware call
}); // end app.use

// for all options requests (pre-flight requests) the origin and method headers will be sent
app.options('/*',(req,res,next)=>{
    res.end(); // send response
}); // end app.options

// parse incoming requests
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use('/api/forms',formEndpoints);
app.use('/api/login',loginEndpoints);
app.use('/api/log',logbookEndpoints);
// // route to login endpoints
// app.use('/api/login', loginEndpoints);

// // route to forms endpoints
// app.use('/api/forms',formEndpoints);

// default endpoint
app.all('/',(req,res)=>{
    res.json({
        msg: 'testing root api endpoint. It works!!!'
    });
}); // end app.all(/)

//seeding admin


// Exports ------------------------------------------------------------------//

export default app;
