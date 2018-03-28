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
    logBookEntry.takeoffs = req.body.to;
    logBookEntry.landings = req.body.lands;
    logBookEntry.date = new Date();
    return logBookEntry;
}
// Routes -------------------------------------------------------------------//

// default version 1.0 route
router.get('/',(req,res)=>{
    res.json({
        msg: 'forms end point root works'
    });
}); // end router.get(/)

router.post('/',(req,res)=>{



  var authResponseJson = {
      success: false,
  };

  const bearer = req.headers['authorization'];
    console.log(bearer);
  token.resolveToken(bearer)
      .then(decoded => {
          console.log(decoded);
          let entry = createLogEntry(req, true);
          console.log(entry);
          return logbook.logbookEntry(createLogEntry(req, true));
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
