import express from '../../../node_modules/express';
import Token from '../../login/Token';



const router = express.Router();

let token = new Token();
let users = new users();

router.post('/',(req,res)=>{
  let abreviation = req.body.abrev;
  let isTurbines = req.body.isTurbine;
  let engNum = req.body.numEngines;

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
              // TODO add checks
          } else {
              entry = createLogEntry(req);
              setPIC(entry, username)
                  .then(() => {
                      setUsername(entry, username);
                      return logbook.logbookEntry(entry);
                  })
          }
      })


      authResponseJson.success = true;
      Res.json(authResponseJson);

});
