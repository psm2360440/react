var express = require('express');
var app = express();//express 객체를 생성하고 
var path = require("path"); //파일이나 디렉토리 목록 담당 라이브러리 


console.log( __dirname); //C:\노드\1일차\views 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var ejs = require("ejs");
const { title } = require('process');
const { writer } = require('repl');
app.use(express.urlencoded({ extended: false })); //body-parser 사용

var guestbookList=[
    {"id":1, "title":"제목1", "writer":"작성자1", "contents":"내용1", "wdate":"2021-11-03"},
    {"id":2, "title":"제목2", "writer":"작성자2", "contents":"내용2", "wdate":"2021-11-04"},
    {"id":3, "title":"제목3", "writer":"작성자3", "contents":"내용3", "wdate":"2021-11-05"},
    {"id":4, "title":"제목4", "writer":"작성자4", "contents":"내용4", "wdate":"2021-11-03"},
    {"id":5, "title":"제목5", "writer":"작성자5", "contents":"내용5", "wdate":"2021-11-03"}
];

//use 함수는 get, post 모두에 응한다, 현재 모든 url을 혼자처리함 
app.get("/list", function (request, response){
    response.render('guestbook/list',  {"title":"게시판목록", "guestbookList":guestbookList});
    //ejs 엔진과 결합 render 함수 
});

//https://search.daum.net/search?w=news&nil_search=btn&DA=NTB&enc=utf8&cluster=y&cluster_page=1&q=%EC%BD%94%EB%A1%9C%EB%82%98 
//상세화면보기 /view?id=1  ==> /view/1
app.get("/view/:id", function (request, response){
  var id = parseInt( request.params.id )-1; //배열은 0부터 시작 , id는 1부터 줬음 
  response.render('guestbook/view',  {"title":"게시판상세화면", "guestbook":guestbookList[id]});
  //ejs 엔진과 결합 render 함수 
});

app.get("/write", (req, res)=>{
  res.render('guestbook/write');
});

app.post("/write", (req, res)=>{
  console.log(req.body);
  var title = req.body.title;
  var writer= req.body.writer;
  var contents= req.body.contents;
  var wdate= req.body.wdate;
  var id = guestbookList.length+1;

  guestbookList.push( {title:title, contents:contents, writer:writer, wdate:wdate, id:id} );
  res.redirect("/list"); //글 작성 후 목록으로 이동한다 
});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
