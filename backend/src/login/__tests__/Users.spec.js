/**
 * Users Test
 */
import Users from '../Users';
import app from '../../app';

describe('testing Users Class', () => {
    const userName = 'testuser';
    const pass = 'password%';
    const users = new Users();

    beforeAll(done => {
        users.saveUser(userName, pass)
            .then(() => {
                console.log('creating test user in db');
                done();
            })
            .catch((error) => {
                console.error(error);
                done();
            });
    });

    afterAll(done => {
        users.deleteUser(userName)
            .then((error) => {
                console.log('removing test user from db');
                done();
            })
            .catch((error) => {
                console.error(error);
                done();
            });
    });

    test('testing method checking that testUser is not admin', () => {
        expect.assertions(1);
        return expect(users.checkIfAdmin(userName)).resolves.toBe(false);
    });


    test('testing method validateUser(userName,pass) checking if testUser exists', () => {
        expect.assertions(1);
        return expect(users.validateUser(userName,pass)).resolves.toBe(true);
    });

    test('testing method validateUser(userName,pass) returns false for invalid user', done => {
        expect.assertions(3);
        users.validateUser(userName,'inCorrectPass')
            .then((isValidUser) => {
                expect(isValidUser).toBe(false);
                return users.validateUser('incorrectUser', pass);
            })
            .then((isValidUser) => {
                expect(isValidUser).toBe(false);
                return users.validateUser('incorrectUser', 'incorrectPass');
            })
            .then((isValidUser) => {
                expect(isValidUser).toBe(false);
                done();
            })
            .catch((err) => {
                if(err) console.error(err);
            })
    });

    test('testing method checkIfAdmin(userName) checking if testUser exists', () => {
        expect.assertions(1);
        return expect(users.checkIfAdmin(userName)).resolves.toBe(false);
    });

    test('testing creating admin user', (done) => {
        const adminUser = 'testAdmin';
        const adminPass = 'testAdmin^Pass';
        expect.assertions(2);
        users.saveUser(adminUser,adminPass, true)
            .then(() => {
                return users.checkIfAdmin(adminUser);
            })
            .then((isAdmin) => {
                expect(isAdmin).toBe(true);
                return users.checkIfAdminUserExists()

            })
            .then((adminUserExists) => {
                expect(adminUserExists).toBe(true);
            })
            .then(() => {
                return users.deleteUser(adminUser);
            })
            .then(() => {
                return users.checkIfAdminUserExists();
            })
            .then(() => {
                done();
            })
            .catch((error) => {
                if(error) console.error(error);
                done();
            });
    });

    test('testing method deleteUser(userName) removes user', (done) => {
        const deleteUser = 'deleteTestUser';
        const deletePass = 'deleteTest^Pass';
        expect.assertions(2);
        users.saveUser(deleteUser, deletePass)
            .then(() => {
                return users.validateUser(deleteUser, deletePass);
            })
            .then((isValidUser) => {
                expect(isValidUser).toBe(true);
                return users.deleteUser(deleteUser);
            })
            .then(() => {
                return users.validateUser(deleteUser, deletePass);
            })
            .then((isValidUser) => {
                expect(isValidUser).toBe(false);
                done();
            })
            .catch((err) => {
                if(err) console.error(err);
                done();
            });
    });

    test('testing method getUser(userName) checking if method returns user object', ()  => {
        expect.assertions(1);
        return expect(users.getUser(userName)).resolves.toBeTruthy();
    });

});
