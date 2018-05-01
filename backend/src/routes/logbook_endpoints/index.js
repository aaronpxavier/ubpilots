/**
 * API Version 1.0
 */

// Imports ------------------------------------------------------------------//
import express from '../../../node_modules/express';
import Token from '../../login/Token';
import Logbook from '../../logbook/Logbook';
import Users from '../../login/Users'
// Variables ------------------------------------------------------------------//
const router = express.Router();
let logbook = new Logbook();
let token = new Token();
let users = new Users();

let toLower = (stringIn) => {
  return stringIn.toLowerCase();
}

let createLogEntry = (req, isConfirmed = false, date = new Date()) => {
    let logBookEntry = logbook.getLogbookEntryJSON();
    logBookEntry.pic = {firstName: toLower(req.body.picFirst), lastName: toLower(req.body.picLast)};
    if(req.body.sicFirst && req.body.sicLast)
        logBookEntry.sic = {firstName: toLower(req.body.sicFirst), lastName: toLower(req.body.sicLast)};
    else if (req.body.sicFirst == '' && req.body.sicLast == '')
        logBookEntry.sic = {firstName: '', lastName: ''};
    else if(req.body.sicFirst)
        logBookEntry.sic = {firstName: toLower(req.body.sicFirst), lastName: ''};
    else if (req.body.sicLast)
        logBookEntry.sic = {firstName: '', lastName: toLower(req.body.sicLast)};

    logBookEntry.ac = {
        abreviation:req.body.acAbrev,
        isTurbine: req.body.isJet,
        numberOfEngines: req.body.noEngines
    };
    logBookEntry.isConfirmed = isConfirmed;
    logBookEntry.departure = toLower(req.body.dep);
    logBookEntry.destination = toLower(req.body.dest);
    if(req.body.imc)
        logBookEntry.imc = req.body.imc;
    logBookEntry.night = req.body.night;
    logBookEntry.takeoffs = req.body.to;
    logBookEntry.landings = req.body.lands;
    logBookEntry.total = req.body.total;
    logBookEntry.date = date;
    return logBookEntry;
}

let setUsername = (entryJSON, username) => {
    entryJSON.username = username;
}

let setPIC = (entryJSON, username) => {
    return new Promise((resolve, reject) => {
        users.getUser(username)
            .then((user) => {
                entryJSON.pic = {firstName: user.firstName, lastName: user.lastName}
                resolve();
            })
            .catch((err) => {
                if(err)
                    reject(err);
            });
    });
}
// Routes -------------------------------------------------------------------//

// default version 1.0 route
router.get('/',(req,res)=>{
    logbook.getAllConfirmedEntries()
        .then(doc => {
            console.log(doc);
            res.json(doc);
        });
}); // end router.get(/)
// default version 1.0 route
router.get('/unconfirmed',(req,res)=>{
    logbook.getAllEntries()
        .then(doc => {
            console.log(doc);
            res.json(doc);
        });
}); // end router.get(/)

router.post('/',(req,res)=>{
  var authResponseJson = {
      success: false,
      authFailed: false
  };

  const bearer = req.headers['authorization'];
  token.resolveToken(bearer)
      .then(decoded => {
          let entry;
          let username = decoded.username;
          if(decoded.isAdmin) {
              entry = createLogEntry(req, true);
              return logbook.logbookEntry(entry);
          } else {
              entry = createLogEntry(req);
              setPIC(entry, username)
                  .then(() => {
                      setUsername(entry, username);
                      return logbook.logbookEntry(entry);
                  })
          }
      })
      .then(() => {
          authResponseJson.success = true;
          res.send(authResponseJson);
      })
      .catch((err) => {
          if (err) console.error(err);
          res.status(403);
          res.json(authResponseJson);
      });
}); // end router.get(/)

router.delete('/:id',(req,res)=> {
    let responseJson = {
        success: false
    }
    if (req.params.id) {
        const bearer = req.headers['authorization'];
        console.log('delete' + bearer);
        token.resolveToken(bearer)
            .then(decoded => {
                if(decoded.isAdmin) {
                    console.log(decoded);
                    return logbook.deleteEntry(req.params.id);
                } else {
                    res.status(403);
                    res.json(responseJson);
                }
            })
            .then((success) => {
                if(success) responseJson.success = true;
                res.json(responseJson);
            })
            .catch((err) => {
                if (err) console.error(err);
                res.status(403);
                res.json(responseJson);
            });
    } else {
        res.json(responseJson);
    }
});
router.put('/confirm',(req,res)=> {
    let responseJson = {
        success: false
    }
    if (req.body.id) {
        const bearer = req.headers['authorization'];
        token.resolveToken(bearer)
            .then(decoded => {
                if(decoded.isAdmin) {
                    return logbook.confirmEntry(req.body.id);
                } else {
                    res.json(responseJson);
                }
            })
            .then(() => {
                responseJson.success = true;
                res.json(responseJson);
            })
            .catch((err) => {
                if (err) console.error(err);
                res.status(403);
                res.json(responseJson);
            });
    } else {
        res.json(responseJson);
    }
});

router.put('/update/:id',(req,res)=> {
    let responseJson = {
        success: false
    }
    if (req.params.id) {
        const bearer = req.headers['authorization'];
        token.resolveToken(bearer)
            .then(decoded => {
                if(decoded.isAdmin) {
                    let date = new Date(req.body.year, req.body.month - 1, req.body.day);
                    return logbook.updateEntry(req.params.id, createLogEntry(req,true,date));
                } else {
                    res.json(responseJson);
                }
            })
            .then(() => {
                responseJson.success = true;
                res.json(responseJson);
            })
            .catch((err) => {
                if (err) console.error(err);
                res.status(403);
                res.json(responseJson);
            });
    } else {
        res.json(responseJson);
    }
});


// Exports ------------------------------------------------------------------//

export default router;
