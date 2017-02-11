var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lets-work-together/lets-work-together.html', { title: "Let's Work Together" });
});

module.exports = router;
