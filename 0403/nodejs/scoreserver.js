let http = require("http");
let fs = require("fs");
let ejs = require("ejs");

let scoreData = [
    {name:"홍길동", kor:90, eng:90, mat:100},
    {name:"임꺽정", kor:80, eng:60, mat:60},
    {name:"장길산", kor:70, eng:70, mat:80},
    {name:"강감찬", kor:80, eng:90, mat:90},
    {name:"이순신", kor:100, eng:100, mat:100}
];
let server = http.createServer( (request, response)=> {


    fs.readFile("./html/score.html", "utf-8", (error, data)=>{
        if(error){ //오류 상황
            response.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
            response.end("error occurred!!!");
            return;
        }
        
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            scoreData:scoreData
            
        }));
    })
})

server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
//리슨(포트번호, )
//1 ~ 1000 : 알려진 포트번호(아무도 안 씀, ex.오라클 1521)

//npm install nodemon