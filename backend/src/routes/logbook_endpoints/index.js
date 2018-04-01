/**
 * API Version 1.0
 */

// Imports ------------------------------------------------------------------//
import express from '../../../node_modules/express';
import Token from '../../login/Token'
import Logbook from '../../logbook/Logbook'

// Variables ------------------------------------------------------------------//
const router = express.Router();
let logbook = new Logbook();
let token = new Token();
let createLogEntry = (req, isConfirmed = false) => {
    let logBookEntry = logbook.getLogbookEntryJSON();
    logBookEntry.pic = {firstName: req.body.picFirst, lastName: req.body.picLast};
    logBookEntry.sic = {firstName: req.body.sicFirst, lastName: req.body.sicLast};
    logBookEntry.ac = {
        abreviation:req.body.acAbrev,
        isTurbine: req.body.isJet,
        numberOfEngines: req.body.noEngines
    };
    logBookEntry.isConfirmed = isConfirmed;
    logBookEntry.departure = req.body.dep;
    logBookEntry.destination = req.body.dest;
    logBookEntry.imc = req.body.imc;
    logBookEntry.night = req.body.night;
    logBookEntry.takeoffs = req.body.to;
    logBookEntry.landings = req.body.lands;
    logBookEntry.total = req.body.total;
    logBookEntry.date = new Date();
    return logBookEntry;
}
// Routes -------------------------------------------------------------------//

// default version 1.0 route
router.get('/',(req,res)=>{
    logbook.getAllEntries()
        .then(doc => {
            res.json(doc);
        });
}); // end router.get(/)

router.post('/',(req,res)=>{

    console.log('req.body: ' + req.body.total);
  var authResponseJson = {
      success: false,
  };

  const bearer = req.headers['authorization'];
  token.resolveToken(bearer)
      .then(decoded => {
          let entry;
          if(decoded.isAdmin) {
              entry = createLogEntry(req, true);
          } else {
              entry = createLogEntry(req);
          }
          console.log(entry);
          return logbook.logbookEntry(entry);
      })
      .then(() => {
          authResponseJson.success = true;
          res.send(authResponseJson);
      })
      .catch((err) => {
          if (err) console.error(err);
          res.status(501);
          res.json(authResponseJson);
      });
}); // end router.get(/)

// Exports ------------------------------------------------------------------//

export default router;
