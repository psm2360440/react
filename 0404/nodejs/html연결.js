var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

//bodyParse : npm install bodyParser를 하고 해야 한다.
//새 버전에서는 express가 있음
//post로 전송할 때 request.body에 보낸 정보를 추가해서 사용이 간편하도록 도와주는 미들웨어

app.use(express.urlencoded({extended:false}));

app.get("/calcform",(request, response)=>{
    fs.readFile("./html/calcform.html", "utf-8", (err,data)=>{
        response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
        response.end(ejs.render(data));
    })
});

app.get("/calc",(request, response)=>{
    let x = parseInt(request.query.x); //input태그의 name속성
    let y = parseInt(request.query.y);
    let operator = parseInt(request.query.operator);
    
    if(operator =="1"){
        response.send(`${x} + ${y} = ${x+y}`);
    } else if (operator =="2"){
        response.send(`${x} - ${y} = ${x-y}`);
    } else if (operator =="3"){
        response.send(`${x} X ${y} = ${x*y}`);
    } else {
        response.send(`${x} / ${y} = ${x/y}`);
    }
});

app.use((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>Express</h1>');
  });

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
});