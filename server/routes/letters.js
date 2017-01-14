var _        = require('lodash');
var express  = require('express');
var fs       = require('fs');
var marked   = require('marked');
var nunjucks = require('nunjucks');
var path     = require('path');
var router   = express.Router();

var numberOfLetters = 0;
var lettersResponse = {};
var letterTitles = [];
var pathToLetters = "../arbitrary-folder";
var postIndex = {};
var allPosts = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function indexPosts(dirpath) {

  var files = fs.readdirSync(dirpath);
  files.forEach(file => {
    if(!file.match(/\.md$/)) {
      return;
    }

    var contents = fs.readFileSync(path.join(dirpath, file));
    var post = Object.assign(contents);

    // Infer the URL from the filename
    post.shorturl = file.match(/(.*)\.md$/)[1];

    postIndex[post.shorturl] = post;
    allPosts.push(post);
  });
}

indexPosts(pathToLetters);

// GET letters listing.
router.get('/', function(req, res, next) {
  res.render('letters/letters.html', { 
    title: 'Letters',
    letterTitles: allPosts
  });
});

// GET random letter.
router.get('/random', function(req, res, next) {
  var randomNumber = getRandomInt(0, allPosts.length);
  var randomParsedResponse = marked(allPosts[randomNumber].toString());

  res.render('letter/letter.html', {
    title: 'Random: ' + req.params.name,
    letter: randomParsedResponse
  });
});

router.get('/:name', function(req, res) {
  var indx = _.findIndex(allPosts, ['shorturl', req.params.name]);
  var parsedResponse = marked(allPosts[indx].toString());

  res.render('letter/letter.html', {
    title: 'Letter: ' + req.params.name,
    letter: parsedResponse
  });
});

module.exports = router;
