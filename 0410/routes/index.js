var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DIGI Campus 2기', session:req.session });
});

module.exports = router;
