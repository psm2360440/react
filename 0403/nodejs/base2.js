var express = require("express");
var app = express();

//express  모듈자체가  use, get, post 함수 3개가 있음
//use : get, post가 오든 처리
//get : get방식으로 온 것만 처리
//post : post방식으로 온 것만 처리
app.use("/test", (requset, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>THIS IS TEST</h1>");
})


app.get("/get", (requset, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>GET</h1>");
})

app.get("/userinfo", (req,res)=>{
    let userinfo={name:"TOM", "phone":"010-79177197"};
    res.send(userinfo); //send함수를 이용해서 JSON데이터
})

//userinfo2?name=Jane&phone=01079177197 -> 옛날 방식
app.get("/userinfo2", (req,res)=>{
    //req.params.name;
    let userinfo2={name:req.query.name, phone:req.query.phone};
    res.send(userinfo2); //send함수를 이용해서 JSON데이터
})

//get방식 : 새롭게 추가된 url방식
//http://127.0.0.1:4370userinfo3/Sunmi/psm5133
app.get("/userinfo3/:username/:userid", (req,res)=>{
    //req.params.name;
    // username = req.params.username,
    // userid = req.params.userid
    // res.send({username:username, userid:userid}); //send함수를 이용해서 JSON데이터

    let userinfo3 = {username:res.params.username, userid:res.params.userid};
    res.send(userinfo3);

})

app.post("/post", (requset, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>POST</h1>");
})


//다른 url처리 없을 때 처리한다.
app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
})