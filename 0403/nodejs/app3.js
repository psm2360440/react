var express = require("express");
var app = express();

//bodyParser 모듈이 있는데 모듈을 설치하고 =>express 자체적으로
//body에 데이터를 가져온다
app.use(express.urlencoded({extended:false}));
//꼭 써주어야 필드가 생기면서 가져올 수 있다...
//미들웨어,  app 객체 만들고, 다른  url 처리 전에만 호출되면 된다.

app.post("/add", (request, response)=>{
    let x = request.body.x;
    let y = request.body.y;
    let z = parseInt(x) + parseInt(y);

    response.send({x:x, y:y, z:z});
})
app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
})


//총정리
//1. get방식의 경우
    //1) x=4&y=5 : requset.query.x, request.query.y
    //2) /4/5 : request.params.x, request.params.y


//2. post방식의 경우
    //app.use(express.urlencoded({extended:false})); 가 선행되어야 함.
    //request.body.x로 처리
