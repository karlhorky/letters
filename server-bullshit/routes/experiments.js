var _        = require('lodash');
var express  = require('express');
var fs       = require('fs');
var marked   = require('marked');
var nunjucks = require('nunjucks');
var path     = require('path');
var router   = express.Router();

// GET letters listing.
router.get('/', function(req, res, next) {
  res.render('experiments/experiments.html', { 
    title: 'Experiments'
  });
});

router.get('/article-grid', function(req, res, next) {
  res.render('experiments/article-grid/article-grid.html', { 
    title: 'Article Grid'
  });
});

module.exports = router;
