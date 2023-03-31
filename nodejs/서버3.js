//필요한 라이브러리들의 로드, 이때 require함수 사용
//http라는 개체를 로드(HTTP의 각종 기능을 요약한 것)
let http = require("http");
//파일을 로드하는 fs 객체
let fs = require("fs"); // 파일을 읽기
let url = require("url"); //url 분석을 위한 라이브러리

//http://127.0.0.1:4370?name=Tom&age=17


//http 객체의 createServer 메서드를 호출하여 서버를 생성
//아래 처름 작성도 가능하고 인수를 붙여 작성도 가능함 아래의 주석 예시
// http.createServer( (request, response)=>{...
//    ...}).listen.(XX);
let server = http.createServer( (request, response)=> {
    //console.log(request);
    console.log(request.url); //전송 url
    console.log(request.method); //전송 방식

    let rurl = request.url;
    let query = url.parse(rurl, true).query;
    // string 분석-> json객체로 전환
    // parsing한다
    console.log(query);

    if( query.name!=""){
        //writeHead는 response 객체의 메소드에서 헤더 정보를 응답에 작성해서 내보내는 것.
        //response 객체의 메소드인 writeHead를 사용하여  type을 결정
        //우선 html 파일을 웹에 띄워준다고 생각
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        //http에는 헤더 정보의 다음에 바디 부분이 되는 콘텐츠를 작성한다.
        //바디부분의 컨텐츠를 내보내도록 하는 메소드가 write
        //write 메소드는 여러번 호출 할 수 있다.
        //컨텐츠 출력의 종료 메소드인 end 메소드가 나오기 전까지 write는 추가 작성 가능
        response.write('<h1>이것은 나오는가</h1>')
        response.write('<p>write메소드는 end메소드 전 몇 번이고 호출할 수 있다</p>')
        
        //end라는 메소드를 이용하여  html 파일이나 html 소스를 보내 그 내용을 웹에 띄움
        //내용 보내기가 완료되면 마지막으로 response객체의 end 메소드를 호출하여 콘텐츠 출력을 완료한다.
        //이때 단지 end 메소드를 호출하고 있을 뿐이지 실제로는 인수로 내보낼 내용의 값을 지정할 수 있다.
        //그러면 인수의 값을 쓴 후에 콘텐츠 출력을 완료한다.
        //이 end로 인해 응답 처리는 종료되고, 그 요청의 처리가 완료된다.
        

        // *중요: writeHead, write, end의 3개가 있으면 클라이언트에 반환 내용은 모두 쓸 수 있다!
        response.end(`이름 : ${query.name} 나이 : ${query.age}`);
    }
})
//서버에 대기
server.listen(4370, ()=>{
    console.log( "server start http://127.0.0.1:4370");
});
//listen(포트번호, )
//1 ~ 1000 : 알려진 포트번호(아무도 안 씀, ex.오라클 1521)

//npm install nodemon