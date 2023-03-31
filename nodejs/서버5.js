let http = require("http");
let fs = require("fs"); // 파일을 읽기
let url = require("url"); //url 분석을 위한 라이브러리

//http://127.0.0.1:4370/add?x=4&y=5
//http://127.0.0.1:4370/sub?x=4&y=5
//http://127.0.0.1:4370/userinfo?userid=test&username=Tom

let server = http.createServer( (request, response)=> {
    //console.log(request);
    //console.log(request.url); //전송 url
    console.log(request.method); //전송 방식

    let rurl = request.url;
    let pathname = url.parse(rurl, true).pathname;  //add
    let query = url.parse(rurl, true).query;    //{x: 4, y: 5}

    console.log(query);
    console.log(pathname);
    console.log( typeof(query));

    // if(pathname =="/add"){

    //     response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    //     response.write('<h1>이것은 나오는가</h1>')
    //     response.write('<p>write메소드는 end메소드 전 몇 번이고 호출할 수 있다</p>')
    //     let x = parseInt(query.x);
    //     let y = parseInt(query.y);
    //     let z = x+y;
    //     response.end(`${x} + ${y} = ${z}`);
    // } else {
    //     response.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
    //     response.end("<h1>존재하지 않는 url 입니다.</h1>");
    // };

    if(pathname =="/sub"){
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write('<h1>This is for SUB</h1>')
        let x = parseInt(query.x);
        let y = parseInt(query.y);
        let z = x-y;
        response.end(`${x} - ${y} = ${z}`);
    } else {
        response.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
        response.end("<h1>존재하지 않는 url 입니다.</h1>");
    };

    // if(pathname =="/userinfo"){
    //     response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    //     response.write('<h1>와춀넴</h1>')
    //     let id = query.userid;
    //     let name = query.username;
    //     response.end(`내 아이디는 ${id} 내 이름은 ${name}`);
    // } else {
    //     response.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
    //     response.end("<h1>존재하지 않는 url 입니다.</h1>");
    // };


})

server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});