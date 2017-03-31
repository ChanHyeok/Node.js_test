var fileSys = require('fs');
var userController = require('../controllers/userController');

//TODO : 파이어베이스에서 읽어오기
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
    var userId = req.body.id;
    var userPw = req.body.password;
    if (userId && userPw) { //id와 password를 모두 받았을 경우
        console.log('ID : ' + userId + '\nPW : ' + userPw);

        userController.createUserData(userId, userPw);
        res.send('성공적으로 등록되었습니다.'); //TODO : 콜백으로 빼기
        console.log('done! registeration success');
    }
    else {  //데이터가 부족할 경우
        //TODO : 다이얼로그 표시. 데이터를 모두 입력하세요
        console.log('error! Lack of Data to registeration');
        res.send('데이터를 모두 입력하세요.');
    }
};

exports.update = function(req, res) {
    var uid = req.body.uid;
    var id = null;
    var password = null;

    if (req.body.uid) {
        console.log('UID : ' + uid);
        if (req.body.id) {
          id = req.body.id;
            console.log('ID : ' + req.body.id);
        }

        if (req.body.password) {
          password = req.body.password;
            console.log('PW : ' + req.body.password);
        }

      userController.updateUserData(uid, id, password);
        res.send('데이터가 변경되었습니다.');
        console.log('done! data updated successful');
    } else {
        res.send('UID가 필요합니다');
        console.log('error! missing UID');
    }
};
