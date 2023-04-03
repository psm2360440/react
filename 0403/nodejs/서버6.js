let http = require("http");
let fs = require("fs");

let server = http.createServer( (request, response)=> {


    fs.readFile("./html/index.html", (error, data)=>{
        if(error){ //오류 상황
            response.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
            response.end("error occurred!!!");
            return;
        }
        
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.end(data); //파일 내용을 브라우저로 송신!

    })
})

server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
//리슨(포트번호, )
//1 ~ 1000 : 알려진 포트번호(아무도 안 씀, ex.오라클 1521)

//npm install nodemon