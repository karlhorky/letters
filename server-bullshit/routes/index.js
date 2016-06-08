var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index.html', { title: 'Express' });
});

module.exports = router;
