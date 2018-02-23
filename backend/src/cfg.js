/**
 * Application Configuration
 *
 */

// Configuration Object -----------------------------------------------------//

let port;
let modeSelection;
let key;

process.env.PORT ? port = process.env.PORT : port = 3000;
process.env.MODE ? modeSelection = process.env.MODE : modeSelection = 'dev';
process.env.TOKEN_KEY ? key = process.env.TOKEN_KEY : key = "kjdsfjklfsalkadsfadfafafafa";

const config = {
    port: port, // server port to listen on
    mode: modeSelection,
    db_host: 'mongodb://localhost/UBPILOTS_DB',
    tokenKey: key
}; // end config

// Exports ------------------------------------------------------------------//
export default config;
