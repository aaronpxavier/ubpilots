// variables -----------------------------------------------------------------//
import Users from '../login/Users';
import fs from 'fs';
import path from 'path';

// variables -----------------------------------------------------------------//
let seedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../secret.json'),'utf8'));
let users = new Users();
let adminUserSeed = seedData.adminUserSeed;
let adminPassSeed = seedData.adminPassSeed;
let userSeed = seedData.userSeed;
let userPassSeed = seedData.userPassSeed;

//functions -----------------------------------------------------------------//
let seedAdmin = () => {
    users.checkIfAdminUserExists()
        .then((hasAdmin) => {
            if (!hasAdmin) {
                users.saveUser(adminUserSeed,adminPassSeed,true);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

let seedUser = () => {
    users.checkIfUserExists()
        .then((hasUser) => {
            if (!hasUser) {
                users.saveUser(userSeed,userPassSeed);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

let seedFn = () => {
    seedAdmin();
    seedUser();
}

//export -----------------------------------------------------------------//
export default seedFn;
