let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");

//기본 board(list화면)
router.get('/', async function(req, res, next) {
    let sql = `
            select id, title, writer,
            date_format(wdate, '%Y-%m-%d') wdate, hit
            from tb_board
            `;
    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', { boardList:results });
});

//Read: 상세보기화면
router.use('/view/:id', async function(req, res, next) {
    let id = req.params.id;
    let sql = `
            select  id, title, writer,
            contents, date_format(wdate, '%Y-%m-%d') wdate, hit
            from tb_board
            where id = ${id}
            `;
    let results = await commonDB.mysqlRead(sql, []); 
    res.render('board/board_view', {boardList:results[0]});
});

//Create1: 새 글 작성 화면 불러오기
router.use('/write', function(req,res,next){
    res.render('board/board_write');
})

//Create2: 새 글 작성 화면의 정보 DB에 저장
router.post('/save', async function(req, res, next){
    let writer = req.body.writer;
    let pwd = req.body.pwd;
    let title = req.body.title;
    let contents = req.body.contents;
    let sql = `
            insert into tb_board(title, writer, contents, pwd, wdate)
            values('${title}', '${writer}', '${contents}', '${pwd}', now())
            `;
    let results = await commonDB.mysqlRead(sql, []); 
    //DB저장 후 board_list 화면으로 이동
    res.redirect('/board');
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
    res.render('board/board_pwd', {boardList:results[0]});
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
    res.render('board/board_update', {boardList:results[0]});
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
    res.render('board/board_delete', {boardList:results[0]});
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
    res.redirect('/board');
})


module.exports = router;


// 'select * from tb_board where id =?' [id]