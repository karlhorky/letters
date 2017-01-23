var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks');

var pathToLongFormContent = "./views/currently/";
var shorturls = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('currently/currently.html', { title: 'Currently Collections' });
});

router.get('/march-2015', function(req, res, next) {
  res.render('currently/march-2015/march-2015.html', { title: 'Currently Collections' });
});

router.get('/january-2014', function(req, res, next) {
  res.render('currently/january-2014/january-2014.html', { title: 'Currently Collections' });
});

module.exports = router;
