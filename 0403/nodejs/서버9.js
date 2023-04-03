let http = require("http");
let jade = require("jade");
let fs = require("fs");


let server = http.createServer( (request, response)=> {
    fs.readFile("html/test1.jade", "utf-8", (error,data)=>{

        let fn = jade.compile(data);
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.end(fn({name:":마니:"}));

    });
})
server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
