let http = require("http");

let server = http.createServer( (request, response)=> {

    if( request.method=="POST"){
        // header 가 먼저 가고 =>  body가 간다.
        // body에서 오는 정보 수신하기
        let body = "";
        //request의 on "data"
        request.on("data", (data)=>{
            body += data;
            //body를 타고 오는 데이터를 계속 받는다
        });

        //데이터 수신이 종료되면
         request.on("end", ()=>{
            //body변수에 그동안 수신한 데이터가 있다.
            let postData = new URLSearchParams(body);

            let name = postData.get("name");
            let age = postData.get("age");

            let temp = `<h1>post</h1>
            <h3>${name} ${age}</h3>`;

            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            response.end(temp);

         })

    } else {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.end('<H1>GET</H1>')
    }
})

server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
