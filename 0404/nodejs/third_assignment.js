var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/calcForm", (request, response)=>{
    fs.readFile("./html/third_assignment.html", "utf-8", (err,data)=>{
        response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
        response.end(ejs.render(data));
    })
});

app.get("/calc", (request, response)=>{
    let studentId = request.query.studentId;
    let kor = parseInt(request.query.kor);
    let eng = parseInt(request.query.eng);
    let mat = parseInt(request.query.mat);

    let sum = kor + eng + mat;
    let avg = sum / 3;
    let msg = `${studentId}님의 총점은 ${sum}점이고 평균은 ${avg}점 입니다! 고생하셨습니다~!`;

    response.send(msg);
})

app.use((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>Express</h1>');
  });

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
});
