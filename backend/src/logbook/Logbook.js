// Imports ------------------------------------------------------------------//
import mongoose from '../../node_modules/mongoose';

// Variables ------------------------------------------------------------------//
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});

var LOGBOOK_SCHEMA = new Schema({

    pic: {firstName: String, lastName: String},
    sic: {firstName: String, lastName: String},
    isConfirmed: {type: Boolean},
    ac: {
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

// Exports ------------------------------------------------------------------//
export default class LogBook {
    constructor() {
        this.logbookModel = mongoose.model('Logbook', LOGBOOK_SCHEMA);
    }

    // createLogBook (pilot, secondInComnd = '', isConfirmed = false, ac, dep, dest, isJet = false,
    //                takeoffsNum, landingsNum, totalTime = 0,
    //                imcTime = 0, nightTime = 0, dateTime) {
    //
    // }
    //

    /**
     * @param userName must be defined with valid string
     * @param pass must be defined with string
     * @param isAdmin must be defined with boolean
     * @returns { mongoose.model }
     */
    createLogbookModel (entryJson) {


        return new this.logbookModel(entryJson);
    }//end createUserModel

    getLogbookEntryJSON () {
        let entryJSON = {
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
          return entryJSON;
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
          return this.createLogbookModel(logBookJSON).save();
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
        return this.logbookModel(entryJSON).save();
    }

    getAllEntries() {
        return this.logbookModel.find({});
    }

    getEntriesForUser(first, last) {
        return this.logbookModel.find( { $or: [ {pic: {firstName: first, lastName: last}}, {sic: {firstName: first, lastName: last}} ]});
    }

    deleteEntry(id) {
        return this.logbookModel.remove({_id:id});
    }
}
