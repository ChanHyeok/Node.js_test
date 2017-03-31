var routesUser = require('./routes/user');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//app.use(express.json()); //들어오는 data가 json형식일때도 파싱할수있게함
app.use(bodyParser.urlencoded({
    extended: false
})); //Body parser init


//Userlist를 불러오기 위한 html 메서드
app.get('/user/list', routesUser.list);

//user 등록을 위한 html 메서드
app.post('/user/register', routesUser.register);

//user update를 위한 html 메서드
app.put('/user/update', routesUser.update);

//TODO : 구현하기
app.delete('/user/delete', routesUser.delete);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
