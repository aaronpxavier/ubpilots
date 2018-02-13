import Users from '../../login/Users';

describe('testing fns in /utilities', () => {
    const userName = 'admin';
    const pass = 'F16falcon';
    const users = new Users();
    let defaultAdminWasThere = false;
    let defaultPass;

    beforeAll(done => {
        users.checkIfAdmin(userName)
            .then((isAdmin) => {
                if(isAdmin) {
                    console.out('hello');
                    defaultAdminWasThere = true;
                    return users.getUser(userName);
                } else {
                    return users.deleteUser(userName);
                }
            })
            .then((user) => {
                if(user) {
                    defaultPass = user.password;
                    return users.deleteUser(userName);
                } else {
                    done();
                }
            })
            .then(() => {
                done();
            })
            .catch((error) => {
                console.log('hello error');
                done();
            });
    });

    test('sample', () => {
        return expect(true).toBe(true);
    });

    afterAll(() => {

    });

    // test('testing seedAdminFn', (done => {
    //     users.checkIfAdmin(userName,pass)
    //         .then((isAdmin) => {
    //             if(isAdmin) {
    //                 return users.deleteUser(userName);
    //             }
    //             else {
    //
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             done();
    //         });
    // }));

});