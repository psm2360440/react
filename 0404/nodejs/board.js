var express = require("express");
var app = express();
var fs = require("fs");
var ejs = ("ejs");

//ejs엔진은 views 폴더 아래서 파일을 검색한다.
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let boardList = [
    {id:1, title:" 푸쉬하시죠", writer:"이진만",  wdate:"2023-04-03"},
    {id:2, title:" 엧칯팇팇피", writer:"백현숙",  wdate:"2023-04-04"},
    {id:3, title:" 오늘도 화이팅입니다", writer:"박다인",  wdate:"2023-04-05"},
    {id:4, title:" 원래 어려워요", writer:"심재현",  wdate:"2023-04-06"},
    {id:5, title:" 이런 방법은 어떠신가요", writer:"김기현",  wdate:"2023-04-07"}
];


app.use("/board/list", (requset, response)=>{
    response.render("board/board_list.ejs", {boardList:boardList});
    //response.writeHead(200, {"Content-type":"text/html"});
    //response.end("<h1>THIS IS TEST</h1>");
})

app.use("/board/view/:id", (requset, response)=>{
    let id = requset.params.id;
    let item = boardList.filter(x=>x.id==id);
    response.render("board/board_view.ejs", {item:item[0]});
})

//페이지만 이동한다. board_write.ejs로 이동만 한다
app.use("/board/write", (requset, response)=>{
    response.render("board/board_write.ejs");
})

//저장하기
app.use("/board/save", (requset, response)=>{
    let title = requset.body.title;
    let contents = requset.body.contents;
    let writer = requset.body.writer;
    let id = boardList.length+1;
    boardList.push({id:id, title:title, contents:contents, writer:writer});
    response.redirect("/board/list"); //강제이동
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
    response.end("<h1>Express</h1>");
});

app.listen(4370, ()=>{
    console.log("server start http://127.0.0.1:4370");
})