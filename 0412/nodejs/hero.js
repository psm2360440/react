var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */
router.get('/list', async function(req, res, next) {
    let sql = `
    SELECT A.id, A.hero_name, A.hero_desc, DATE_FORMAT(A.wdate, '%Y-%m-%d-%H:%i') wdate
    FROM tb_hero A
    `;
    let results = await commonDB.mysqlRead(sql, []);
    res.json(results);


    // results = 
    //     [
    //         {"id":1, "hero_name":"박선미", "hero_desc":"건강함"},
    //         {"id":2, "hero_name":"김진희", "hero_desc":"젊음"},
    //         {"id":3, "hero_name":"이성영", "hero_desc":"뻔뻔함"},
    //         {"id":4, "hero_name":"허명현", "hero_desc":"건강함"},
    //         {"id":5, "hero_name":"문대호", "hero_desc":"건강함"}
    //     ]
    
    // res.json(results);
});

router.post('/write', async function(req, res, next){
    let hero_name  = req.body.hero_name;
    let hero_desc  = req.body.hero_desc;
    sql = `
            INSERT INTO tb_hero( hero_name, hero_desc, wdate)
            VALUES( ?, ?, NOW());
            `;
    try{
        await commonDB.mysqlRead(sql, [hero_name, hero_desc]);
        res.json({"result":"success"});
    } catch (e) {
        console.log(e);
        res.json({"result":"fail"});
    }
})

module.exports = router;
