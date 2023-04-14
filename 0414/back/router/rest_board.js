let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

router.use('/img', function(req, res, next){
    res.send('./img/remove.png');
})
//http://localhost:9090/rest_board/list/:pg
router.get('/list/:pg', async function(req, res, next) {
    let pg = parseInt(req.params.pg);
    let sql = `
            select count (*) cnt
            from tb_board A
            left join (select @rownum:=0) B on 1=1
            left join tb_member C on A.writer = C.userid
            `;
    let results = await commonDB.mysqlRead(sql,[]);
    let totalCnt = results[0]["cnt"];

    sql = `SELECT A.id, A.title, A.writer, A.num, A.username, date_format(A.wdate, '%Y-%m-%d') wdate, A.cmt, A.hit
            FROM ( SELECT A.id, A.title, A.writer, A.wdate, A.cmt, A.hit, c.username
                        , @rownum:=@rownum+1 num
                   FROM tb_board A
                        LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
                        LEFT OUTER JOIN tb_member C ON A.writer = C.userid
                   ORDER BY id DESC
            ) A
            LIMIT ${(pg-1)*10}, 10
            `;
    results = await commonDB.mysqlRead(sql, []);
    console.log(results);
    res.json({  boardList:results,
                                    totalCnt:totalCnt,
                                    pg:pg
            }); // 응답완료
}); // 한 함수 내에서 res.json 호출하고 도 다시 res.send나 render나 json 호출 못 한다.

//Read: 상세보기화면
router.get('/view/:id', async function(req, res, next) {
    let id = req.params.id;
    let hit = `
            update tb_board
            set hit = hit+1
            where id = ${id}
            `;
        await commonDB.mysqlRead(hit,[]);
    let sql = `
            SELECT A.id, A.title, A.writer, A.cmt,
            A.contents, DATE_FORMAT(A.wdate, '%Y-%m-%d %H:%i') AS wdate, A.hit,
            (SELECT username FROM tb_member B WHERE A.writer = B.userid) AS username
            FROM tb_board A
            WHERE id = ${id}    
            `;
    let sql2 = `
            select id, comId, comWriter, comContents, date_format(comdate, '%Y-%m-%d %H:%i') comDate
            from tb_comment
            where id = ${id}
            `;
            //subquery: select( 결과셋이 하나 또는 0일 때 가능 ),
                    //  from 인라인뷰,
                    //  where절에는 드물다( 책은 여기만 나옴 )
            //속도: join > subquery > function
            //nested loop join => for문 돌려서 조인을 한다. 10이전 버전
            //hash join => 양쪽 테이블의  join칼럼을 기준으로 해쉬테이블을 만들어 조인한다. (엄청빠름)
            //선형검색(n번비교),  이진검색(데이터가 순서대로 있을 때), 해쉬검색(제일 빠름)
    let results = await commonDB.mysqlRead(sql, []); 
    let results2 = await commonDB.mysqlRead(sql2,[]);
    if(results.length == 0){
        res.json({result:"fail", msg: "작성된 글이 없습니다."});
    }
    res.json({result:"success", msg:"", boardData: results[0], comments:results2});
});

router.use('/save', async function(req, res, next){
    let title = req.body.title;
    let contents = req.body.contents;
    let writer = req.body.writer;
    let sql = `
            insert into tb_board(title, writer, contents, wdate)
            values('${title}', '${writer}', '${contents}', now())
            `;
    if(title === undefined || writer === undefined || contents === undefined){
        res.json({"result":"fail", "msg":"빈칸을 모두 채운 후 등록 가능합니다!"})
        return
    };
    try{
        await commonDB.mysqlRead(sql, []);
        res.json({"result":"success", "msg":"등록 성공!"});
    } catch(e){
        console.log(e)
        res.json({"result":"fail", "msg":"등록 실패~!"});
    }
})

router.post('/write', async function(req, res, next){
        
    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;

    checkInfos = [
        {key: "title",   type: "str", range:200},
        {key: "writer",   type: "str", range:40},
        {key: "contents", type: "str", range:-1} //'-1'은 무제한
    ]
    //수행결과값이 0이면 문제 없음 / 다른 값이 오면 오류
    insertInfo = commonUtil.checkInfo( req, checkInfos);
    if( insertInfo["result"]!=0 ){
        res.json(insertInfo)
        return;
    }
    
    let sql = `
            select count(*) cnt
            from tb_member
            where userid = '${writer}'
            `;
    let = results = await commonDB.mysqlRead(sql, []);
    if(results[0]["cnt"]==0){
        res.json({result:"fail", msg: "해당하는 아이디가 없습니다!"});
        return;
    }

    sql = `
        insert into tb_board(title, writer, contents, wdate)
        values ('${title}', '${writer}', '${contents}', now());
        `;
  
        await commonDB.mysqlRead(sql, [])
        res.json({"result":"success", msg: "등록되었습니다!"}); 
})

router.use('/myList/:userid', async function(req, res, next){
    let userid = req.params.userid;
    let sql = `
            select count(*) cnt 
            from tb_board 
            where writer = '${userid}'
            `;
    let results = await commonDB.mysqlRead(sql, []);
    let cnt = results[0]["cnt"];

    sql = `
            select id, title, writer, cmt
            , date_format(wdate, '%Y-%m-%d') wdate, hit 
            from tb_board 
            where writer = '${userid}'
            `;
    results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_myList', {session:req.session, boardList:results, cnt:cnt});
})

router.use('/myComment/:userid', async function(req, res, next){
    let userid = req.params.userid;
    let sql = `
            select count(*) cnt
            from tb_comment
            where comWriter = '${userid}'
            `;
    let results = await commonDB.mysqlRead(sql,[]);
    let cnt = results[0]["cnt"];

    sql = `
            select comId, id, comWriter, comContents
            , date_format(comDate, '%Y-%m-%d %H:%i') comDate
            from tb_comment
            where comWriter = '${userid}'
            order by comDate desc
            `;
    results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_mycomment', {session:req.session, comments:results, cnt:cnt});
})

// //Create1: 새 글 작성 화면 불러오기
// router.use('/write', function(req,res,next){
//     res.render('board/board_write', {session:req.session});
// })

//Create2: 새 글 작성 화면의 정보 DB에 저장
router.use('/save', async function(req, res, next){
    let writer = req.session["userid"];
    let title = req.body.title;
    let contents = req.body.contents;
    let sql = `
            insert into tb_board(title, writer, contents, wdate)
            values('${title}', '${writer}', '${contents}', now())
            `;
    // try{
    //     await commonDB.mysqlRead(sql, []);
    //     res.json({"result":"success"});
    // } catch(e){
    //     console.log(e)
    //     res.json({"result":"fail"});
    // }
    //DB저장 후 board_list 화면으로 이동
    let results = await commonDB.mysqlRead(sql, []);
    res.redirect('/board/list/1');
})

//Update1: 상세보기화면의 EDIT버튼 클릭 시 이 화면이동
//         상세보기화면에서 넘겨 받은 id 정보로 비밀번호 일치여부 확인
router.use('/pwd/:id', async function(req, res, next){
    let id = req.params.id;
    let sql = `
            select *
            from tb_board
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_pwd', {boardList:results[0], session:req.session});
})

//Update2: 비밀번호 일치 확인 되면 해당 게시글의 수정 입력 화면으로 이동
router.post('/update', async function(req, res, next){
    let id = req.body.id;
    //게시글 수정 입력 화면으로 이동
    res.redirect(`/board/update/${id}`)
})

//Update3: 게시글 수정 입력 화면
//         기존 정보가 수정가능하도록 노출됨
router.use('/update/:id', async function(req, res, next){
    let id = req.params.id;
    let sql = `
            select id, writer, title, contents
            from tb_board
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_update', {boardList:results[0], session:req.session});
})

//Update: 수정화면에서 입력 받은 데이터를 DB에 update
router.post('/updateCommit', async function(req, res, next){
    let id = req.body.id;
    let title = req.body.title;
    //수정된 날짜 정보를 Contents에 남기기
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let msg = `/ ${year}년 ${month}월 ${day}일에 수정됨`
    let contents = req.body.contents + msg;

    let sql = `
            update tb_board SET title = '${title}', contents = '${contents}'
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []); 
    //DB에 행 정보 수정 후, 수정된 게시글의 상세보기 화면으로 이동
    res.redirect(`/board/view/${id}`);
})

//Delete1: 상세보기화면의 DELETE버튼 클릭 시 화면이동
//        비밀번호 일치 여부 확인
router.use('/delete/:id', async function(req, res, next){
    let id = req.params.id;
    let sql = `
            select *
            from tb_board
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_delete', {boardList:results[0], session:req.session});
})

//Delete2: 비밀번호 일치 확인 후, DB의 테이블에서 행 삭제
//         삭제 후, board_list 화면으로
router.use('/delete', async function(req, res, next){
    let id = req.body.id;
    let sql = `
            delete from tb_board
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []);
    //DB삭제 후, board_list 화면으로 이동
    res.redirect('/board/list/1');
})

router.post('/comDelete', async function(req, res, next){
    let comId = req.body.comId;
    let id = req.body.id;
    let sql = `
            delete from tb_comment
            where comId = ${comId}
            `;
    
    let sql2 = `
    update tb_board
    set cmt = cmt-1
    where id = '${id}'
            `;
    try{
    await commonDB.mysqlRead(sql, []);
    await commonDB.mysqlRead(sql2, []);
    res.json({"result":"success"});
    } catch (e) {
        console.log(e);
        res.json({"result":"fail"});
    }
})

router.post('/commentSave', async function(req, res, next){
    let id = req.body.id;
    let comWriter = req.session["userid"];
    let comContents = req.body.comContents;

    let sql = `
            insert into tb_comment(id, comWriter, comContents, comDate)
            values('${id}', '${comWriter}', '${comContents}',now())
            `;
    let sql2 = `
            update tb_board
            set cmt = cmt+1
            where id = ${id}
            `;
    try{
        await commonDB.mysqlRead(sql, []);
        await commonDB.mysqlRead(sql2, []);
        res.json({"result":"success"});
        // res.redirect(`/board/view/${id}`);
    } catch(e) {
        res.json({"result":"fail"});
    }
})

module.exports = router;

// 'select * from tb_board where id =?' [id]