var firebase = require('firebase');
var consts = require('../const');
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
var database = firebase.database();

function createUserData(id, password) {
    //새로운 키 할당
    var newKey = firebase.database().ref().child(consts.USERS).push().key;

    updateUserData(newKey, id, password);
}

function updateUserData(uid, id, password) {
    var newUser = userModel(uid, id, password);
    var updates = {};
    updates['/' + consts.USERS + '/' + uid] = newUser;
    return firebase.database().ref().update(updates);
}

function deleteUserData(uid){
  return firebase.database().ref().child(consts.USERS).child(uid).remove();
}

exports.updateUserData = updateUserData;
exports.createUserData = createUserData;
exports.deleteUserData = deleteUserData;
