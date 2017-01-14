var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('speaking/speaking.html', { title: 'Speaking Engagements' });
});

module.exports = router;
