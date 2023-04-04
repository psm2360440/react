var express = require("express");
var app = express();
var path = require("path");//파일이나 디렉토리 목록 담당 라이브러리

console.log(__dirname); //C:\노드\1일차\views

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

var ejs = require("ejs");
const {title} = require("process");
const {writer} = require("repl");
app.use(express.urlencoded({ extended: false}));//body-parser사용

var guestbookList=[
    {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2023-04-04"},
    {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2023-04-04"},
    {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2023-04-04"},
    {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2023-04-04"},
    {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2023-04-04"}
];

//use 함수는 get, post 모두에 응한다, 현재 모든 url을 혼자 처리함
app.get("/list", function (request, response){
    response.render("guestbook/list", {"title":"게시판목록", "guestbookList":guestbookList});
    //ejs 엔진과 결합 render 함수
});

//https://search/daum.net/search?w=news&nil_search=btn&DA=NTB&enc=utf8&cluster=y&cluster_page=1&q=%EC%BD%94%EB%A1%9C%EB%82%98
//상세화면보기 /view?id=1 ==>/view/1
app.get("/veiw/:id", function(request, response){
    var id = parseInt( request.params.id)-1; //배열은 0부터 시작, id는 1부터 줬음
    response.render("guestbook/view", {"title":""})
})