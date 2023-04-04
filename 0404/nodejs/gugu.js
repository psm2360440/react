var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/guguform",(request, response)=>{
    fs.readFile("./html/guguform.html", "utf-8", (err,data)=>{
        response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
        response.end(ejs.render(data));
    })
});

app.get("/gugu",(request, response)=>{
    let dan = parseInt(request.query.dan);
    let gugu = '<p style = "color:moccasin">구구단을 외자!</p>';
    for( i = 1; i <= 9; i++){
        gugu += `<p style = "color:magenta">${dan} X ${i} = ${dan*i}</p>`;  
    };
    response.send(gugu);
});

app.use((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>Express</h1>');
  });

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
});