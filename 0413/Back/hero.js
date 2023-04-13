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


/* GET home page. */
router.get('/list', async function(req, res, next) {
    let sql = `
    SELECT A.id, A.hero_name, A.hero_desc, DATE_FORMAT(A.wdate, '%Y-%m-%d-%H:%i') wdate
    FROM tb_hero A
    `;
    let results = await commonDB.mysqlRead(sql, []);
    res.json(results);

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

router.get('/view/:id', async function(req, res, next){
    try{
    let id = req.params.id;
    let sql = `
            select * from tb_hero
            where id = '${id}'
            `;
    let results = await commonDB.mysqlRead(sql, []);
    res.json({"results": "success", "hero":results[0]});
    } catch (e) {
        console.log(e);
        res.json({"results":"fail"});
    }
})

router.post('/update', async function(req, res, next){
    try{
    let id = req.body.id;
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
            update tb_hero set hero_name=?
            hero_desc = ? where id = ?
            `;
   await commonDB.mysqlRead(sql, [hero_name, hero_desc, id]);
    res.json({"results": "succedss"});
    } catch (e) {
        console.log(e);
        res.json({"results":"fail"});
    }
})




module.exports = router;
