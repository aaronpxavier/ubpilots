
import Logbook from '../Logbook';
import app from '../../app';


describe('testing Logbook Class', () => {
    let logBook = new Logbook();
    let id;
    let picFirst = 'Han';
    let picLast = 'Solo';

    beforeAll(done => {
        let logBookEntry = logBook.getLogbookEntryJSON();
        logBookEntry.pic = [{firstName: picFirst}, {lastName: picLast}];
        logBookEntry.sic = [{firstName: 'Luke'}, {lastName: 'Skywalker'}];
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
        console.log(logBookEntry);
        logBook.logbookEntry(logBookEntry).then(() => {
            console.log(logBookEntry);
            done();
        });
    });

    afterAll(done => {
        logBook.delete()
            .then(() => {
                done();
            })
            .catch((err) => {
                if (err) {
                    console.out(err);
                }
                done();
            })
    });

});
