
// Imports ------------------------------------------------------------------//
import mongoose from '../../node_modules/mongoose';

// Variables ------------------------------------------------------------------//
const SCHEMA = mongoose.Schema;
const LOGBOOK_SCHEMA = new SCHEMA({
    pic: [{firstName: String}, {lastName: String}],
    sic: [{firstName: String}, {lastName: String}],
    isConfirmed: {type: Boolean},
    aircraft: [{
        abreviation: String,
        isTurbine: Boolean,
        numberOfEngines: Number
    }],
    departure: {type: String},
    destination: {type: String},
    imc: {type: Number},
    night: {type: Number},
    total: {type: Number},
    takeoffs: {type: Number},
    landings: {type: Number},
    date: {
        type: Date,
        default: Date.now
    }
});
const LOGBOOK_SHEMA_MODEL = mongoose.model('User', LOGBOOK_SCHEMA);

// Exports ------------------------------------------------------------------//
export default class LogBook {

    constructor() {
    }

    createLogBook (pilot, secondInComnd = '', isConfirmed = false, ac, dep, dest, isJet = false,
                   takeoffsNum, landingsNum, totalTime = 0,
                   imcTime = 0, nightTime = 0, dateTime) {

    }

    logbookEntryJSON(logBookJson) {
        return new LOGBOOK_SHEMA_MODEL(logBookJSON).save();
    }

    /**
     * @param pilot must be defined with valid user string
     * @param secondInComnd optional
     * @param isAdmin default to false must be boolean.
     * @returns promise obj after creating user in database
     */
    logbookEntry (pilot, secondInComnd = '', isConfirmed = false, ac, dep, dest, takeoffsNum,
                  landingsNum, dateTime, imcTime = 0,
                  nightTime = 0, totalTime = 0,) {
        let entryJSON;
        if (dateTime) {
            entryJSON =
                {
                    pic: pilot,
                    sic: secondInComnd,
                    isConfirmed: isConfirmed,
                    acType: ac,
                    departure: dep,
                    destination: dest,
                    total: totalTime,
                    takeoffs: takeoffsNum,
                    landings: landingsNum,
                    imc: imcTime,
                    night: nightTime,
                    date: dateTime
                }
        } else {
            entryJSON =
                {
                    pic: pilot,
                    sic: secondInComnd,
                    acType: ac,
                    isConfirmed: isConfirmed,
                    departure: dep,
                    destination: dest,
                    isTurbine: isJet,
                    imc: imcTime,
                    night: nightTime,
                    total: totalTime,
                    takeoffs: takeoffsNum,
                    landings: landingsNum,
                }
        }
        return LOGBOOK_SHEMA_MODEL(entryJSON).save();
    }

}
