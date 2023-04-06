let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get('/', async function(req, res, next) {
    let sql = `
            select id, title, writer,
            contents, date_format(wdate, '%Y-%m-%d') wdate
            from tb_board
        `;
    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', { boardList:results });
});

module.exports = router;
