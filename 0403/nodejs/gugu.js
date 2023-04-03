var express = require("express");
var app = express();

//http://127.0.0.1:4370/gugu?dan=4
app.get("/gugu", (req,res)=>{
    let gugu = {
        dan : req.query.dan,
        1: parseInt(req.query.dan) * 1,
        2: parseInt(req.query.dan) * 2,
        3: parseInt(req.query.dan) * 3,
        4: parseInt(req.query.dan) * 4,
        5: parseInt(req.query.dan) * 5,
        6: parseInt(req.query.dan) * 6,
        7: parseInt(req.query.dan) * 7,
        8: parseInt(req.query.dan) * 8,
        9: parseInt(req.query.dan) * 9
    };
    res.send(gugu);
})
app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
})