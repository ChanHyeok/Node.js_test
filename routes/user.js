var consts = require('../public/const');
var fileSys = require('fs');
//var userController = require('../controllers/userController');


//TODO : 파이어베이스 선언 위치???
var firebase = require('firebase');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCARCeOvNPk4Y29I6QSzdf9jqECOobKyNs",
    authDomain: " nodetest-e0aff.firebaseapp.com",
    databaseURL: "https://nodetest-e0aff.firebaseio.com",
    storageBucket: "nodetest-e0aff.appspot.com",
};
// Initialize the default app
firebase.initializeApp(config);
var databaseRef = firebase.database().ref();

 exports.list = function(req, res) {
   //TODO view
         databaseRef.child(consts.USERS).on('value', function(snapshot) {
             console.log('value listner called');
             console.log(snapshot.val());
         });
};
//
// exports.register = function(req, res) {
//     var userId = req.body.id;
//     var userPw = req.body.password;
//     if (userId && userPw) { //id와 password를 모두 받았을 경우
//         console.log('ID : ' + userId + '\nPW : ' + userPw);
//
//         userController.createUserData(userId, userPw);
//         res.send('성공적으로 등록되었습니다.'); //TODO : 콜백으로 빼기
//         console.log('done! registeration success');
//     } else { //데이터가 부족할 경우
//         //TODO : 다이얼로그 표시. 데이터를 모두 입력하세요
//         console.log('error! Lack of Data to registeration');
//         res.send('데이터를 모두 입력하세요.');
//     }
// };
//
// //uid를 받아 해당 children을 업데이트 하는 함수
// exports.update = function(req, res) {
//     var uid = req.body.uid;
//     var id = null;
//     var password = null;
//
//     if (uid) {
//         console.log('UID : ' + uid);
//         if (req.body.id) {
//             id = req.body.id;
//             console.log('ID : ' + req.body.id);
//         }
//
//         if (req.body.password) {
//             password = req.body.password;
//             console.log('PW : ' + req.body.password);
//         }
//
//         userController.updateUserData(uid, id, password);
//         res.send('데이터가 변경되었습니다.');
//         console.log('done! data updated successful');
//     } else {
//         res.send('UID가 필요합니다');
//         console.log('error! missing UID for update');
//     }
// };
//
// //uid를 받아 DB에서 날리는 메서드
// exports.delete = function(req, res) {
//     var uid = req.body.uid;
//     if (uid) { //UID를 입력받았을 경우
//         userController.deleteUserData(uid);
//         res.send('사용자 데이터가 제거되었습니다.');
//         console.log('done! data delete successful');
//     } else { //UID를 입력받지 않았을 경우
//         res.send('삭제할 데이터가 없습니다.');
//         console.log('error! missing UID for delete');
//     }
// };
