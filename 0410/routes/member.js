let express = require('express');
let router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/member_register', { title: 'Express' });
});

// //ID중복체크 : 클라이언트로부터 아이디를 받는다
//                받아온 아이디를 DB에 가서 존재하는지 유무 확인
//                존재하면 사용자에게 fail 반환, 
//                존재하지 않아서 사용가능하면 success 반환

router.use('/idcheck', async function(req, res, next){
  let userid = req.body.userid; // 사용자단에서 userid 보내야 받을 수 있음
  let sql = `
          select count(*) cnt
          from tb_member
          where userid='${userid}'
          `;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if(cnt == 0)
    res.json({"result":"success"});
   else 
    res.json({"result":"fail"});
});

router.use('/save', async function(req, res, next){
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let nickname = req.body.nickname;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;

  let sql = `
          insert into tb_member(userid, password, username, email, phone, nickname, zipcode, address1, address2, wdate)
          values (?, ?, ?, ?, ?, ?, ?, ?, ?, now())
          `;
  try{
    await commonDB.mysqlRead(sql, [userid, password, username, email, phone, nickname, zipcode, address1, address2]);
    res.json({"result": "success"});
  } catch(e){
    console.log( e );
    res.json({"result":"fail"});
  }
})

router.get('/login', function(req, res, next){
  res.render("member/member_logon")
})

router.use('/findCheck', async function(req, res, next){
  let userid = req.body.userid;
  let sql = `
          select count(*) cnt
          from tb_member
          where userid='${userid}'
          `;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if(cnt == 1){
    let phone = req.body.phone;
    let email = req.body.email;
    let sql2 = `
              select phone, email
              from tb_member
              where userid='${userid}'
              `;
    let rows2 = await commonDB.mysqlRead(sql2);
    let ph = rows2[0]["phone"];
    let em = rows2[0]["email"];
    if ( phone == ph && email == em){
      res.json({"result":"success"});
    } else {
        res.json({"result":"fail"});
    }
  } else {
    res.json({"result":"fail"});
  } 
})

router.get('/logout', function(req, res){
  req.session["userid"]="";
  req.session["username"]="";
  req.session["email"]="";
  req.session["password"]="";
  res.redirect("/");
  // req.session.destroy( (err)=>{
  //   if(err) {
  //     console.log(err);
  //   } else {

  //   }
  // });
})
router.post('/login', async function(req, res, next){
  let userid = req.body.userid;
  let sql = `
          select count(*) cnt
          from tb_member
          where userid='${userid}'
          `;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if(cnt == 1){
    let password = req.body.password;
    let sql2 = `
              select *
              from tb_member
              where userid='${userid}'
              `;
    let rows2 = await commonDB.mysqlRead(sql2);
    let pwd = rows2[0]["password"];
    if ( password == pwd){
      req.session["username"] = rows2[0]["username"];
      req.session["userid"] = rows2[0]["userid"];
      req.session["email"] = rows2[0]["email"];
      req.session["password"] = rows2[0]["password"];
      res.json({"result":"success"});
    } else {
      res.json({"result":"fail", msg:"비밀번호가 일치하지 않습니다!"});
    }
  } else {
    res.json({"result":"fail", msg:"존재하지 않는 ID입니다!"});
  }
})

router.get('/find', function(req, res, next){
  res.render("member/member_find")
})

router.get('/put', async function(req, res, next){
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log( req.session["userid"] );
  // res.redirect("/");
});
module.exports = router;
