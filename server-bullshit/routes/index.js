var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var randomNumber = getRandomInt(1, 3);

console.log(randomNumber);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index' + [randomNumber] + '.html', { title: 'Helen V. Holmes' });
});

module.exports = router;
