//console.log('hello world!');

//require()와 module.exports
var util = require('util'); //기본 제공 유틸리티 함수 모듈
//var userModule = require('./user_module');  //나만의 모듈.  기본모듈을 < ./ > 가 없어서 알아서 찾지만 얘는 기본모듈이 아니라 현재위치에서 찾아줘야함
var server = require('http'); //웹서버
var routesUser = require('./routes/user');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//app.use(express.json()); //들어오는 data가 json형식일때도 파싱할수있게함
app.use(bodyParser.urlencoded({ extended: false }));  //Body parser init


//Userlist를 불러오기 위한 html 메서드
app.get('/user/list', routesUser.list);

//user 등록을 위한 html 메서드
app.post('/user/register', routesUser.register);

//user update를 위한 html 메서드
app.put('/user/update', routesUser.update);

//TODO json 파일에서 user를 제거
app.delete('/user/delete', function (req, res) {
  res.send('Got a DELETE request at /user');
  //pop : 자동으로 빈공간 채우면서 데이터 추출
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



// console.log("텍스트 파일의 내용 : ");
