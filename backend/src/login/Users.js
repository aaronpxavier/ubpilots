import mongoose from '../../node_modules/mongoose';

const SCHEMA = mongoose.Schema;
const UserSchema = new SCHEMA({
    username: {type: String},
    password: {type: String},
    isAdmin: {type: Boolean},
    date: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model('User', UserSchema);

export default class Users {
    constructor() {}

    /**
     * @param userName must be defined with valid user string
     * @param pass must be defined with valid password string
     * @param isAdmin default to false must be boolean.
     * @define creates user in db
     * @returns {Promise}
     */
    saveUser (userName, pass, isAdmin = false) {
        return this.createUserModel(userName, pass, isAdmin).save();
    }//end saveUser

    /**
     * @param userName must be defined with valid user string
     * @returns promise obj that resolves true if user is an admin
     */
    checkIfAdmin(userName) {
        return new Promise((resolve,reject) => {
            userModel.findOne({ 'username': userName }, 'isAdmin', function (err, user) {
                if(err)
                    reject(err);
                else if (!user)
                    reject(new Error('User is not in db'));
                else if(user.isAdmin)
                    resolve(true);
                else
                    resolve(false);
            });
        });
    }// end checkIfAdmin

    /**
     * @param userName must be defined with valid user.
     * @define Method must not be used to validate user.
     * @returns {Promise} that resolves user json if user exists in db
     */
    getUser(userName) {
        return new Promise((resolve,reject) => {
            userModel.findOne({ username: userName}, function (err, doc){
                if (err) reject(err);
                else resolve(doc);
            });
        });
    }//end getUser

    /**
     * @param userName must be defined with valid string
     * @param pass must be defined with string
     * @param isAdmin must be defined with boolean
     * @returns { mongoose.model }
     */
    createUserModel (userName, pass, isAdmin) {

        let userJSON = {
            username: userName,
            password: pass,
            isAdmin: isAdmin,
        }
        return new userModel(userJSON)
    }//end createUserModel

    /**
     * @param userName must be declared and defined with valid username
     * @param pass must be declared and defined with valid password
     * @returns promise object that will resolve true if user is valid;
     * * * */
    validateUser (userName, pass) {
        return new Promise((resolve,reject) => {
            userModel.findOne({ 'username': userName }, 'username password', function (err, user) {
                if(err)
                    reject(err);
                else if(user && user.username === userName && user.password === pass)
                    resolve(true);
                else
                    resolve(false);
            });
        });
    }//end validateUser

    /**
     * @param userName must be declared and defined with valid username
     * @define fn deletes user from db
     * @returns { Promise }
     * * * */
    deleteUser(userName) {
        return userModel.remove({username: userName});
    }//end deleteUser

    /**
     * @define fn checks if a admin Exists on mongoDB. If there is an admin then Promise resolves true. Otherwise returns false
     * @return { Promise }
     **/
    checkIfAdminUserExists() {
        return new Promise ((resolve) => {
            userModel.findOne({'isAdmin': true}, 'isAdmin', function (err, user) {
                console.log(user);
                if (err)
                    resolve(false);
                else if (user)
                    user.isAdmin ? resolve(true) : resolve(false);
                else
                    resolve(false);
            });
        });
    }

    /**
     * @define fn checks if a regular user Exists on mongoDB. If there is an non admin user then Promise resolves true. Otherwise returns false
     * @return { Promise }
     **/
    checkIfRegularUserExists() {
        return new Promise ((resolve) => {
            userModel.findOne({'isAdmin': false}, 'isAdmin', function (err, user) {
                console.log(user);
                if (err)
                    resolve(false);
                else if (user)
                    user.isAdmin === false ? resolve(true) : resolve(false);
                else
                    resolve(false);
            });
        });
    }
}
