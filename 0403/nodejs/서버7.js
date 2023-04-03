let http = require("http");
let fs = require("fs");
let ejs = require("ejs"); //npm install ejs(cmd관리자모드 실행 -> nodejs 파일있는 곳으로 change directory -> npm install ejs)

let server = http.createServer( (request, response)=> {

    //상대경로
    //'./': 나와 같은 위치
    //'..': 상위폴더
    // './html/test.html' == 'html/test.html' 

    fs.readFile("./html/test.html", "utf-8", (error, data)=>{
        if(error){ //오류 상황
            response.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
            response.end("error occurred!!!");
            return;
        }
        
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            name: "Tom",
            age: 23,
            address: "서울시 관악구",
            limit: 10
        })); //파일 내용을 브라우저로 송신!

        //ejs템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다.

    })
})

server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
//리슨(포트번호, )
//1 ~ 1000 : 알려진 포트번호(아무도 안 씀, ex.오라클 1521)

//npm install nodemon