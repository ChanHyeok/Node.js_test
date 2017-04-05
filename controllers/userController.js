var consts = require('../public/const');
var userModel = require('../models/userModel');

function createUserData(databaseRef, id, password) {
    //새로운 키 할당
    var newKey = databaseRef.child(consts.USERS).push().key;

    updateUserData(databaseRef, newKey, id, password);
}

function updateUserData(databaseRef, uid, id, password) {
    var newUser = userModel(uid, id, password);
    var updates = {};
    updates['/' + consts.USERS + '/' + uid] = newUser;
    return databaseRef.update(updates);
}

function deleteUserData(databaseRef, uid){
  return databaseRef.child(consts.USERS).child(uid).remove();
}

exports.updateUserData = updateUserData;
exports.createUserData = createUserData;
exports.deleteUserData = deleteUserData;
