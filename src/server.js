/**
 * API Server
 */

// Imports ------------------------------------------------------------------//
import config from './cfg';
import app from './app';

// Server -------------------------------------------------------------------//

app.listen(config.port,()=>{
    console.log('API server listening on port ' + config.port);
}); // end app.listen