var express = require("express");
var app = express();


//http://127.0.0.1:4370/gugudan/4
app.get("/gugudan/:dan",(req,res)=>{
    let dan = parseInt(req.params.dan);
    let gugudan = "";
    for( i = 1; i <= 9; i++){
        gugudan += `${dan} X ${i} = ${dan*i} <br>`;
    };
    res.send(gugudan)
});

//http://127.0.0.1:4370/gugu?dan=4
app.get("/gugu",(req,res)=>{
    let dan = parseInt(req.query.dan);
    let gugudan = "";
    for( i = 1; i <= 9; i++){
        gugudan += `${dan} X ${i} = ${dan*i} <br>`;
    };
    res.writeHead(200, {"Content-type":"text/html"});
    res.write(gugudan);
    res.end("error")
});


app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>nothing to print</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
});