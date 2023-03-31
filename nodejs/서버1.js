let http = require("http");

http.createServer( (request, response)=> {
    response.writeHead(200, {'Content-Type': 'text/html;charset:utf-8'});
    response.end('<H1>Hello my first Webserver</H1>')
}).listen(4000, ()=>{
    console.log( "server start http://127.0.0.1:4000");
});
//리슨(포트번호, )
//1 ~ 1000 : 알려진 포트번호(아무도 안 씀, ex.오라클 1521)

//npm install nodemon