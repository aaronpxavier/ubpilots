// Imports ------------------------------------------------------------------//
import mongoose from '../../node_modules/mongoose';

// Variables ------------------------------------------------------------------//
const SCHEMA = mongoose.Schema;
const LOGBOOK_SCHEMA = new SCHEMA({
    pic: [{firstName: String}, {lastName: String}],
    sic: [{firstName: String}, {lastName: String}],
    isConfirmed: {type: Boolean},
    aircraft: {
        abreviation: String,
        isTurbine: Boolean,
        numberOfEngines: Number
    },
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
const LOGBOOK_SHEMA_MODEL = mongoose.model('Logbook', LOGBOOK_SCHEMA);

// Exports ------------------------------------------------------------------//
export default class LogBook {

    constructor() {
    }

    // createLogBook (pilot, secondInComnd = '', isConfirmed = false, ac, dep, dest, isJet = false,
    //                takeoffsNum, landingsNum, totalTime = 0,
    //                imcTime = 0, nightTime = 0, dateTime) {
    //
    // }
    //


    getLogbookEntryJSON () {
      return entryJSON =
          {
              pic: [],
              sic: [],
              ac: {},
              isConfirmed: false,
              departure: '',
              destination: '',
              imc: 0,
              night: 0,
              total: 0,
              takeoffs: 0,
              landings: 0,
              date: null
          }
      
    }



    /**
     * @param pilot must be defined with valid user string
     * @param secondInComnd optional
     * @param isAdmin default to false must be boolean.
     * @returns promise obj after creating user in database
     */
    // logbookEntry (pilot, secondInComnd = '', isConfirmed = false, ac, dep, dest, takeoffsNum,
    //               totalTime = 0, landingsNum, dateTime, imcTime = 0, nightTime = 0) {
    logbookEntry (logBookJSON) {
        if (logBookJSON.date) {
          return LOGBOOK_SHEMA_MODEL.save();
        } else {
            entryJSON =
                {
                    pic: logBookJSON.pic,
                    sic: logBookJSON.sic,
                    acType: logBookJSON.acType,
                    isConfirmed: logBookJSON.isConfirmed,
                    departure: logBookJSON.departure,
                    destination: logBookJSON.destination,
                    imc: logBookJSON.imc,
                    night: logBookJSON.night,
                    total: logBookJSON.total,
                    takeoffs: logBookJSON.takeoffs,
                    landings: logBookJSON.landings,
                }
        }
        return LOGBOOK_SHEMA_MODEL(entryJSON).save();
    }

    getAllEntries() {
        return LOGBOOK_SHEMA_MODEL.find({});
    }

    getEntriesForUser(first, last) {
        return LOGBOOK_SHEMA_MODEL.find({pic: [{firstName: first, lastName: last}]});
    }

    deleteEntry(id) {
        return LOGBOOK_SHEMA_MODEL.remove({_id:id});
    }

}
