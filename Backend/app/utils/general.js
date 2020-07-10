const config = require('../../config.json');

const General = function () {

    General.defaultDatabase = config.database.default;

    if (typeof General.firebase == 'undefined') {
        const admin = require("firebase-admin");
        const serviceAccount = process.env.FIREBASE_KEY ? process.env.FIREBASE_KEY : require("../../private/key.json"); 
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: config.database.firebase.url
        });
        General.firebase = admin;
    }

    this.getFirebase = function () {
        return General.firebase;
    };

    this.getDatabaseModel = function () {
        let model;
        switch (General.defaultDatabase) {
            case 'firestore':
                model = require('../model/firestore')(General.firebase.firestore());
                break;
            default:
                model = require('../model/firestore')(General.firebase.firestore());
                console.log('firebase-defecto')
                break;
        }
        return model;

    };
    this.setDefaultDatabase = function (database) {
        General.defaultDatabase = database;
    };
    return this;
};
module.exports = General;