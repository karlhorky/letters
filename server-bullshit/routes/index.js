var express  = require('express');
var router   = express.Router();
var nunjucks = require('nunjucks');
var fs       = require('fs');
var path     = require('path');
var glob     = require("glob");

var pathToLongFormContent = "./views/home/";
var shorturls = [];

var files = glob.sync("**/*.html", {cwd: pathToLongFormContent});

function indexLongformWriting() {
  var shorturl;

  files.forEach(file => {
    if (file === "home.html") {
      return;
    }

    shorturl = file.match(/(.*)\.html$/)[1];
    shorturl = shorturl.substring(shorturl.indexOf("/") + 1);
    shorturls.push(shorturl);
  });
}

indexLongformWriting();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/home.html', { 
    title: 'read some cool stuff',
    longFormTitles: shorturls
  });
});

shorturls.forEach(shorturl => {
  if (shorturl === "type-is-your-right") {
    router.get("/" + shorturl, function(req, res, next) {
      res.render("home/" + shorturl + "/" + shorturl + ".html", { title: 'type is your right' });
    });
  } else { // most articles are "the"-something
    router.get("/the-" + shorturl, function(req, res, next) {
      res.render("home/" + shorturl + "/" + shorturl + ".html", { title: shorturl });
    });
  }
});

module.exports = router;
