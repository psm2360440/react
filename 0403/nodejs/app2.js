var express = require("express");
var app = express();


//http://127.0.0.1:4370/add?x=45&y=7
app.get("/add",(req,res)=>{
    let add = {
     x : req.query.x,
     y : req.query.y,
     z : parseInt(req.query.x) + parseInt(req.query.y)
    }
    res.send(add);
})

http://127.0.0.1:4370/add2/45/7
app.get("/add2/:x/:y",(req,res)=>{
    // x = req.params.x,
    // y = req.params.y,
    // z = parseInt(x) + parseInt(y)
    // res.send({x:x, y:y, z:z});

    let add2 = {
        x : req.params.x,
        y : req.params.y,
        z : parseInt(req.params.x) + parseInt(req.params.y)
    }
    res.send(add2);
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
})