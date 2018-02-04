/**
 * Application Configuration
 */

// Configuration Object -----------------------------------------------------//

let port;
let modeSelection;

process.env.PORT ? port = process.env.PORT : port = 3000;
process.env.MODE ? modeSelection = process.env.MODE : modeSelection = 'dev';

const config = {
    port: port, // server port to listen on
    mode: modeSelection,
    db_host: 'mongodb://localhost/UBPILOTS_DB',
}; // end config

// Exports ------------------------------------------------------------------//
export default config;
