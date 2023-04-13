var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');


router.get('/score', async function(req, res, next){
    let sql = `
        SELECT A.id, A.s_name, A.kor, A.mat, A.eng
        FROM tb_score A
        `;
    let results = await commonDB.mysqlRead(sql, []);
    res.json(results);
});

module.exports = router;
