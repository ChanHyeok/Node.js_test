var fileSys = require('fs');
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

function overWriteUserData(userId, id, password) {
    firebase.database().ref(consts.USERS + '/' + userId).set({
        uid: userId,
        id: id,
        password: password
    });
}

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


exports.list = function(req, res) {
    //user.json 파일 읽어옴_동기
    var userData = JSON.parse(fileSys.readFileSync('user.json', 'utf8'));

    var count = Object.keys(userData.ID).length; //카운트를 구함
    var listOfUser = ''; //출력할 유저 리스트
    for (var i = 0; i < count; i++)
        listOfUser += 'name : ' + userData.ID[i] + '\nage : ' + userData.PW[i] + '\n';

    res.send(listOfUser); //res 는 하나만 보인다
};

exports.register = function(req, res) {
    //user.json 파일 읽어옴_동기
    var userData = JSON.parse(fileSys.readFileSync('user.json', 'utf8'));

    var userId = req.body.id;
    var userPw = req.body.password;
    if (userId && userPw) { //id와 password를 모두 받았을 경우
        console.log('done! registeration success');
        console.log('ID : ' + userId + '\nPW : ' + userPw);
        res.send('성공적으로 등록되었습니다.');


        userData.ID.push(userId);
        userData.PW.push(userPw);

        //user.Json 파일에 저장하기
        // var tempData = JSON.stringify(userData);
        // fileSys.writeFile('./user.json',tempData,encoding='utf-8',function(err){
        //   if(err) throw err;
        //   console.log('done! user.json updated');
        // });

        //overWriteUserData('test', userId, userPw);
        createUserData(userId, userPw);
    } //데이터가 부족할 경우
    else {
        //TODO : 다이얼로그 표시. 데이터를 모두 입력하세요
        console.log('error! Lack of Data to registeration');
        res.send('데이터를 모두 입력하세요.');
    }
};

exports.update = function(req, res) {
    //user.json 파일 읽어옴_동기
    var userData = JSON.parse(fileSys.readFileSync('user.json', 'utf8'));
    var index = req.body.index;

    if (req.body.index) {
        console.log('인덱스는 : ' + index);
        if (req.body.id) {
            userData.ID[index] = req.body.id;
            console.log('아이디는 : ' + req.body.id);
        }

        if (req.body.password) {
            userData.PW[index] = req.body.password;
            console.log('비밀번호는 : ' + req.body.password);
        }

        var tempData = JSON.stringify(userData);
        fileSys.writeFile('./user.json', tempData, encoding = 'utf-8', function(err) {
            if (err) throw err;
            console.log('done! user.json updated');
        });

        res.send('데이터가 변경되었습니다.');
    } else {
        res.send('missing index');
    }
};
