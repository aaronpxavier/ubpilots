/**
 * API Version 1.0
 */

// Imports ------------------------------------------------------------------//
import express from '../../../node_modules/express';
import Token from '../../login/Token'
import Logbook from '../../logbook/Logbook'

// Variables ------------------------------------------------------------------//
const router = express.Router();
let logBook = new Logbook();
let token = new Token();

// Routes -------------------------------------------------------------------//

// default version 1.0 route
router.get('/',(req,res)=>{
    res.json({
        msg: 'forms end point root works'
    });
}); // end router.get(/)

router.post('/',(req,res)=>{
  let logBookJSON = Logbook
  let userName = req.body.username;
  let pass = req.body.pass;
  var authResponseJson = {
      success: false,
  };

  const bearer = req.headers['authorization'];
  token.resolveToken(bearer)
      .then(decoded => {
          authResponseJson.success = true;
          res.send(authResponseJson);
      })
      .catch(() => {
          res.status(403);
          res.json(authResponseJson);
      });
}); // end router.get(/)

// Exports ------------------------------------------------------------------//

export default router;
