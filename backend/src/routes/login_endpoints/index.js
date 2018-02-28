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
    let userName = req.body.username;
    let pass = req.body.pass;
    var loginResponseJson = {
        success: false,
        isAdmin: false,
        token: 'n/a'
    };

    token.getToken(userName, pass)
        .then(token => {
            loginResponseJson.success = true;
            loginResponseJson.token = token;
            console.log(token);
            return users.checkIfAdmin(userName);
        })
        .then(isAdmin => {
            loginResponseJson.isAdmin = isAdmin;
            res.json(loginResponseJson);
        })
        .catch (error => {
            console.error(error);
            res.status(401);
            res.json(loginResponseJson);
        });
}); //end router.post(/login)

router.get('/authcheck', (req, res) => {
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
}); //end router.get(/protected)

// Exports ------------------------------------------------------------------//

export default router;
