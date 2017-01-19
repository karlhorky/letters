var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('type-loading/type-loading.html', { title: 'type-loading' });
});

module.exports = router;
