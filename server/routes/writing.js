var express  = require('express');
var router   = express.Router();
var nunjucks = require('nunjucks');
var fs       = require('fs');
var path     = require('path');
var glob     = require("glob");

var pathToLongFormContent = "./views/writing/";
var shorturls = [];
var shorturlTitles = [];

var files = glob.sync("**/*.html", {cwd: pathToLongFormContent});

function indexLongformWriting() {
  var shorturl;
  var shorturlTitle;

  files.forEach(file => {
    if (file === "writing.html") {
      return;
    }

    shorturl = file.match(/(.*)\.html$/)[1];
    shorturl = shorturl.substring(shorturl.indexOf("/") + 1);
    shorturls.push(shorturl);

    shorturls = shorturls.reverse();

    shorturlTitle = shorturl.substring(6);
    shorturlTitles.push(shorturlTitle);
    shorturlTitles = shorturlTitles.reverse();
  });
}

indexLongformWriting();

/* GET writing page. */
router.get('/', function(req, res, next) {
  res.render('writing/writing.html', { 
    title: 'Writing',
    longFormTitles: shorturlTitles
  });
});

shorturls.forEach(shorturl => {
  var shorturlTitle = shorturl.substring(6);

  if (shorturl === '16-08-type-is-your-right') {
    router.get('/' + shorturlTitle, function(req, res, next) {
      res.render('writing/' + shorturlTitle + '/' + shorturl + '.html', { title: 'Type is Your Right!' });
    });
  } else if (shorturl === '15-11-baas') {
    router.get('/' + shorturlTitle, function(req, res, next) {
      res.render('writing/' + shorturlTitle + '/' + shorturl + '.html', { title: 'Baas' });
    });
  } else { // most articles are 'the'-something
    router.get('/the-' + shorturlTitle, function(req, res, next) {
      res.render('writing/' + shorturlTitle + '/' + shorturl + '.html', { title: shorturlTitle.replace(/-/g, ' ') });
    });
  }
});

module.exports = router;
