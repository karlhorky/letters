var express = require('express');
var router = express.Router();
var nunjucks = require('nunjucks')

router.get('/game-of-thrones', function(req, res, next) {
  res.render('portfolio/game-of-thrones/game-of-thrones.html', { title: "Game of Thrones Book Covers" });
});

router.get('/united', function(req, res, next) {
  res.render('portfolio/united/united.html', { title: "United Rebranding and App" });
});

router.get('/well-made-co', function(req, res, next) {
  res.render('portfolio/well-made-co/well-made-co.html', { title: "Well Made Co. Packaging Design" });
});

router.get('/winsome', function(req, res, next) {
  res.render('portfolio/winsome/winsome.html', { title: "Winsome Webapp" });
});

module.exports = router;
