var express  = require('express');
var router   = express.Router();
var nunjucks = require('nunjucks');
var fs       = require('fs');
var path     = require('path');
var glob     = require("glob");

var pathToLongFormContent = "./views/writing/";
var shorturls = [];
var blogPostTitles = [];

var files = glob.sync("**/*.html", {cwd: pathToLongFormContent});

function indexLongformWriting() {
  var shorturl;
  var blogPostTitle;

  files.forEach(file => {
    if (file === "writing.html") {
      return;
    }

    shorturl = file.match(/(.*)\.html$/)[1];
    shorturl = shorturl.substring(shorturl.indexOf("/") + 1);
    shorturls.push(shorturl);

    shorturls = shorturls.sort().reverse();

    blogPostTitle = shorturl.substring(6);
    blogPostTitles.push(blogPostTitle);
    blogPostTitles = blogPostTitles.sort().reverse();
  });
}

indexLongformWriting();

/* GET writing page. */
router.get('/', function(req, res, next) {
  res.render('writing/writing.html', { 
    title: 'Writing',
    longFormTitles: blogPostTitles
  });
});

shorturls.forEach(shorturl => {
  var blogPostTitle = shorturl.substring(6);

  if (shorturl === '16-08-type-is-your-right') {
    router.get('/' + blogPostTitle, function(req, res, next) {
      res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: 'Type is Your Right!' });
    });
  } else if (shorturl === '15-11-baas') {
    router.get('/' + blogPostTitle, function(req, res, next) {
      res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: 'Baas' });
    });
  } else { // most articles are 'the'-something
    router.get('/the-' + blogPostTitle, function(req, res, next) {
      res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: blogPostTitle.replace(/-/g, ' ') });
    });
  }
});

module.exports = router;
