let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

router.use('/img', function(req, res, next){
    res.send('./img/remove.png');
})

//기본 board(list화면)
router.get('/list/:pg', async function(req, res, next) {
    let pg = parseInt(req.params.pg);
    //pg = 1 : 0 => (pg-1)*10 = 0
    //pg = 2 : 10 => (2-1)*10 = 10
    //pg = 3 : 20 => (3-1)*10 = 20

    let sql = `
            select count (*) cnt
            from tb_board A
            left outer join (select @rownum:=0) B on 1=1
            left outer join tb_member C on A.writer = C.userid
            `;
    let results = await commonDB.mysqlRead(sql,[]);
    let totalCnt = results[0]["cnt"];

    sql = `SELECT A.id, A.title, A.writer, A.num, A.username, date_format(A.wdate, '%Y-%m-%d') wdate, A.cmt, A.hit
            FROM ( SELECT A.id, A.title, A.writer, A.wdate, A.cmt, A.hit, c.username
                        , @rownum:=@rownum+1 num
                   FROM tb_board A
                        LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
                        LEFT OUTER JOIN tb_member C ON A.writer = C.userid
                   ORDER BY A.id DESC
            ) A
            LIMIT ${(pg-1)*10}, 10
            `;
    results = await commonDB.mysqlRead(sql, []);
    console.log(results);
    res.render('board/board_list', { session:req.session, boardList:results,
                                    totalCnt:totalCnt, pg:pg,
                                    paging:commonUtil.getPaging(pg,totalCnt)});
});

//Read: 상세보기화면
router.use('/view/:id', async function(req, res, next) {
    let id = req.params.id;
    let hit = `
            update tb_board
            set hit = hit+1
            where id = ${id}
            `;
        await commonDB.mysqlRead(hit,[]);
    let sql = `
            select  id, title, writer, cmt,
            contents, date_format(wdate, '%Y-%m-%d %H:%i') wdate, hit
            from tb_board
            where id = ${id}
            `;
    let sql2 = `
            select id, comId, comWriter, comContents, date_format(comdate, '%Y-%m-%d %H:%i') comDate
            from tb_comment
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []); 
    let results2 = await commonDB.mysqlRead(sql2,[]);
    res.render('board/board_view',  {session:req.session, boardList:results[0], comments:results2});
});

//Create1: 새 글 작성 화면 불러오기
router.use('/write', function(req,res,next){
    res.render('board/board_write', {session:req.session});
})

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

router.use('/comDelete', async function(req, res, next){
    let id = req.body.id;
    let comId = req.body.comId;
    let comPwd = req.body.comPwd;

    let sql = `
            delete from tb_comment
            where id = ${id} and comId = ${comId}
            `;
    
    let sql2 = `
            update tb_board
            set cmt = cmt-1
            where id = ${id}
            `;
    await commonDB.mysqlRead(sql, []);
    await commonDB.mysqlRead(sql2, []);
    res.redirect(`/board/view/${id}`);
})

router.use('/cmtDelete/:id/:comId', async function(req, res, next){
    let id = req.params.id;
    let comId = req.params.comId;
    let sql = `
            select id, comId, comPwd
            from tb_comment
            where id = ${id} and comId = ${comId}
            `;
    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_cmtDelete', {comment:results[0]});
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