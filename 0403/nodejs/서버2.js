let http = require("http");

let server = http.createServer( (request, response)=> {
    //브라우저에서  http://127.0.0.1:4370 으로 액세스 요청이 들어오면
    //request 객체 : 브라우저에서 요청한 정보를 담아오는 객체
    //response : 서버에서 클라이언트로 정보를 보낼 때 여기에 담아 보낸다.
    //
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    response.end('<H1>한글 break</H1>')
}).listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
//리슨(포트번호, )
//1 ~ 1000 : 알려진 포트번호(아무도 안 씀, ex.오라클 1521)

//npm install nodemon