var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('long-form/long-form.html', { title: 'read some cool stuff' });
});

router.get('/the-state-of-devtools', function(req, res, next) {
  res.render('long-form/state-of-devtools/state-of-devtools.html', { title: 'The State of Devtools' });
});

module.exports = router;
