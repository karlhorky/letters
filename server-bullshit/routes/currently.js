var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var randomNumber = getRandomInt(1, 3);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('currently/currently' + [randomNumber] + '.html', { 
    title: 'some rogue designer'
  });
});

module.exports = router;
