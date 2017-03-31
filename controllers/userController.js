var firebase = require('firebase');
var consts = require('../const');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyCARCeOvNPk4Y29I6QSzdf9jqECOobKyNs",
    authDomain: " nodetest-e0aff.firebaseapp.com",
    databaseURL: "https://nodetest-e0aff.firebaseio.com",
    storageBucket: "nodetest-e0aff.appspot.com",
};
// Initialize the default app
firebase.initializeApp(config);
console.log(firebase.name); // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var database = firebase.database();


function createUserData(id, password) {
    //새로운 키 할당
    var newKey = firebase.database().ref().child(consts.USERS).push().key;

    updateUserData(newKey, id, password);
}

function updateUserData(uid, id, password) {
    //TODO : usermodel
    var userModel = {
        uid: uid,
        id: id,
        password: password
    };

    var updates = {};
    updates['/' + consts.USERS + '/' + uid] = userModel;
    return firebase.database().ref().update(updates);
}

exports.updateUserData = updateUserData;
exports.createUserData = createUserData;
