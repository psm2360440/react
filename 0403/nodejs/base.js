let http = require("http");

let server = http.createServer( (request, response)=> {

    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    response.end('<H1>한글 break</H1>')
})
server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
