import Users from '../Users';
import Token from '../Token';
import app from '../../app';


describe('testing Token Class', () => {
    const userName = 'testuser';
    const pass = 'password%';
    const users = new Users();
    const token = new Token();

    beforeAll(done => {
        users.saveUser(userName, pass)
            .then(() => {
                console.log('creating test user in db');
                done();
            })
            .catch((error) => {
                console.log(error);
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

    test('testing method getToken(userName,password)', () => {
        expect.assertions(1);
        return expect(token.getToken(userName, pass)).resolves.toBeTruthy();

    });

    test('testing method getToken(userName,password) rejects invalid user', () => {
        expect.assertions(1);
        return expect(token.getToken(userName, 'wrongPass')).rejects.toBeInstanceOf(Error);
    });

    test('testing method resolveToken(token) resolves token', (done) => {
        token.getToken(userName, pass)
            .then(tokenIn => {
                return token.resolveToken(tokenIn);
            })
            .then(decodedValue => {
                expect(decodedValue).toBeTruthy();
                done();
            });
    });

});
