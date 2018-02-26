/**
 * API Version 1.0
 */

// Imports ------------------------------------------------------------------//
import express from '../../../node_modules/express';
import Token from '../../login/Token'
import Users from '../../login/Users'

// Variables-----------------------------------------------------------------//

const router = express.Router();
var token = new Token();
var users = new Users();


// Routes -------------------------------------------------------------------//

// default version 1.0 route

router.get('/',(req,res)=>{
    res.json({
        msg: 'login end point root works'
    });
}); // end router.get(/)

router.post('/auth', (req, res) => {
    var loginResponseJson = {
        success:false,
        token:''
    };
    let userName = req.body.username;
    let pass = req.body.pass;

    token.getToken(userName, pass)
        .then(token => {
            loginResponseJson.success = true;
            loginResponseJson.token = token;
            res.json(loginResponseJson);
        })
        .catch (error => {
            console.error(error);
            res.status(401);
            res.json(loginResponseJson);
        });
}); //end router.post(/login)

router.get('/protected', (req, res) => {
    const bearer = req.headers['authorization'];
    token.resolveToken(bearer)
        .then(decoded => {
            res.send(decoded.username);
        })
        .catch(() => {
            res.send(403);
        });
}); //end router.get(/protected)

// Exports ------------------------------------------------------------------//

export default router;
