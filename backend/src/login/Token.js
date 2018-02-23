
import Users from './Users';
import jwt from '../../node_modules/jsonwebtoken';
import cfg from '../cfg';

const key = cfg.tokenKey;

export default class Token {

    constructor () {
        this.users = new Users();
        this.tokenExpMins = 180;
    }

    /**
     * @param userName must be defined with valid string
     * @param password must be defined with valid string
     * @returns {Promise} that resolves with token string if userName and Password are valid
     */
    getToken(userName,password) {
        return new Promise((resolve, reject)=>{
            // let hash = crypto.createHash('SHA512');
            // let hashValue;
            this.users.validateUser(userName, password)
                .then((isValidUser) => {
                    if (isValidUser) {
                        return this.users.getUser(userName);
                    }
                    else {
                        reject(new Error('Invalid User'));
                    }
                })
                .then( (user) => {
                    jwt.sign(user.toJSON(), key,
                        { expiresIn: 60 * this.tokenExpMins }, (err, token) => {
                            if (err) reject(err);
                            resolve(token);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @param token must be defined with valid json web token
     * @returns {Promise}
     * @define promise resolves with decoded string if token is valid. Other wise rejects with error.
     */
    resolveToken(token) {
        return new Promise((resolve, reject)=> {
            jwt.verify(token, key, function(err, decoded) {
                if(err) reject(err);
                //console.log(decoded);// bar
                resolve(decoded);
            });
        });
    }

}