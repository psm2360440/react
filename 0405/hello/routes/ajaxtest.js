var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("ajaxtest");
});

router.get('/ajaxtest1', function(req, res, next) {
  res.render("ajax/ajaxtest1");
});

//send  함수가 적당히 알아서 데이터 보낸다.
router.get('/result1', function(req, res, next) {
  res.send("data만 보낸다.");
});

router.use('/ajaxtest2', function(req, res, next) {
  res.render("ajax/ajaxtest2");
});

router.use('/add', function(req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x+y;
  res.json({result:z});
});

router.use('/scoreCal_1', function(req, res, next) {
  res.render("ajax/scoreCal_1");
});

router.use('/cal', function(req, res, next) {
  studentId = req.query.studentId;
  kor = parseInt(req.query.kor);
  eng = parseInt(req.query.eng);
  mat = parseInt(req.query.eng);
  sum = kor + eng + mat;
  avg = sum / 3;
  msg = `${studentId}님의 총점은 ${sum}점이고 평균은 ${avg}점 입니다! 고생하셨습니다~!`
  res.json({result:msg});
});

module.exports = router;
