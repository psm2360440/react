var express = require("express");
var fs = require("fs");
var app = express();
var ejs = require("ejs");

app.set("view engine", ejs)//내부변수에 값을 설정한다
//미들웨어를 사용한다
app.use(express.urlencoded({extended:false}));

app.get("/", (request, response)=>{
    fs.readFile("html/index.html", "utf-8", (error,data)=>{
        response.send( data.toString() );
    })
});
app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
});