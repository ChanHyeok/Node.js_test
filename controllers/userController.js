var firebase = require('firebase');
var consts = require('../public/const');
var userModel = require('../models/userModel');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCARCeOvNPk4Y29I6QSzdf9jqECOobKyNs",
    authDomain: " nodetest-e0aff.firebaseapp.com",
    databaseURL: "https://nodetest-e0aff.firebaseio.com",
    storageBucket: "nodetest-e0aff.appspot.com",
};
// Initialize the default app
firebase.initializeApp(config);
// You can retrieve services via the defaultApp variable...
var databaseRef = firebase.database().ref();

function createUserData(id, password) {
    //새로운 키 할당
    var newKey = databaseRef.child(consts.USERS).push().key;

    updateUserData(newKey, id, password);
}

function updateUserData(uid, id, password) {
    var newUser = userModel(uid, id, password);
    var updates = {};
    updates['/' + consts.USERS + '/' + uid] = newUser;
    return databaseRef.update(updates);
}

function deleteUserData(uid){
  return databaseRef.child(consts.USERS).child(uid).remove();
}

exports.updateUserData = updateUserData;
exports.createUserData = createUserData;
exports.deleteUserData = deleteUserData;
