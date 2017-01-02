var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('currently/currently1.html', { title: 'read about me' });
});

module.exports = router;
