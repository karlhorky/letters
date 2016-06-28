var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('long-form/long-form.html', { title: 'Helen V. Holmes' });
});

module.exports = router;
