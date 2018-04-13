
import Logbook from '../Logbook';
import app from '../../app';


describe('testing Logbook Class', () => {
    let logbook = new Logbook();
    let picFirst = 'han';
    let picLast = 'solo';
    let username = 'testuser11'
    let logbookInstanceId;
    beforeAll(done => {

        let logBookEntry = logbook.getLogbookEntryJSON();
        logBookEntry.pic = {firstName: picFirst, lastName: picLast};
        logBookEntry.sic = {firstName: 'luke', lastName: 'skywalker'};
        logBookEntry.username = username;
        logBookEntry.ac = {
            abreviation:'C-172',
            isTurbine: false,
            numberOfEngines: 2
        };
        logBookEntry.isConfirmed = true;
        logBookEntry.departure = 'KFPR';
        logBookEntry.destination = 'KVRB';
        logBookEntry.imc = 0;
        logBookEntry.takeoffs = 1;
        logBookEntry.landings = 1;
        logBookEntry.date = new Date();
        logbook.logbookEntry(logBookEntry).then((doc) => {
            logbookInstanceId = doc._id;
            done();
        });
    });
    test('Logbook class is Truthy', () => {
        expect.assertions(1);
        return expect(new Logbook()).toBeTruthy();
    });

    test('test method getAllEntries()', () => {
        expect.assertions(1);
        return expect(logbook.getAllEntries()).resolves.toBeTruthy();

    });
    test('test method getAllEntries()', () => {
        expect.assertions(1);
        return expect(logbook.getAllEntries()).resolves.toBeTruthy();

    });

    test('test method getEntriesFirstLast', (done) => {
       expect.assertions(2);
       logbook.getEntriesFirstLast(picFirst,picLast)
           .then((doc) => {
               expect(doc).toBeTruthy();
               return logbook.getEntriesFirstLast('luke', 'skywalker')
           })
           .then((doc) => {
               expect(doc).toBeTruthy();
               done();
           })
           .catch(err => {
               if (err) console.log(err);
               done();
           });
    });

    test('test method getEntriesUsername', (done) => {
        expect.assertions(2);
        logbook.getEntriesUsername(username)
            .then((doc) => {
                expect(doc).toBeTruthy();
            })
            .then((doc) => {
                expect(doc).toBeTruthy();
                done();
            })
            .catch(err => {
                if (err) console.log(err);
                done();
            });
    });

    afterAll(done => {
        logbook.deleteEntry(logbookInstanceId)
            .then(() => {
                done();
            });

    });
});
