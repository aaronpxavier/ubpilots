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
    console.log('username: ' + userName + ' pass: ' + pass);
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

router.post('/signup', (req, res) => {
    let username = req.body.username;
    let first = req.body.first;
    let last = req.body.last;
    let pass = req.body.pass;

    let responseJson = {
        success: false,
        userAlreadyExists: false,
    }

    if (username && first && last && pass) {
        users.checkIfUserExists(username)
            .then(userExists => {
                if (userExists) {
                    responseJson.userAlreadyExists = true;
                    res.json(responseJson);
                } else {
                    responseJson.success = true;
                    users.saveUser(username,first,last,pass);
                    res.json(responseJson);
                }
            })
            .catch((err) => {
                print(err);
                res.json(responseJson);
            });
    }
    else
        res.json(responseJson);
});

// Exports ------------------------------------------------------------------//

export default router;
