var express = require("express");
var app = express();

app.use((request, response, next)=>{
    //request 브라우저 ->서버
    //response 서버 -> 브라우저
    //next : 다음 함수를 호출한다.
    request.name = "홍길동";
    response.name = "John";
    console.log("aaaaaaa");
    next();
});

app.use((request, response, next)=>{
    console.log("bbbbbbbb");
    request.phone="010-7917-7197";
    response.address = "서울시 영등포구";
    next();
});

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
    console.log(request.name);
    console.log(response.name);
    console.log(request.phone);
    console.log(response.address);
    response.end("<h1>nothing to print</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
});