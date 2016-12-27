var express  = require('express');
var router   = express.Router();
var nunjucks = require('nunjucks');
var fs       = require('fs');
var path     = require('path');
var glob     = require("glob");

var pathToLongFormContent = "./views/writing/";
var shorturls = [];

var files = glob.sync("**/*.html", {cwd: pathToLongFormContent});

function indexLongformWriting() {
  var shorturl;

  files.forEach(file => {
    if (file === "writing.html") {
      return;
    }

    shorturl = file.match(/(.*)\.html$/)[1];
    shorturl = shorturl.substring(shorturl.indexOf("/") + 1);
    shorturls.push(shorturl);
  });
}

indexLongformWriting();

/* GET writing page. */
router.get('/', function(req, res, next) {
  res.render('writing/writing.html', { 
    title: 'read some cool stuff',
    longFormTitles: shorturls
  });
});

shorturls.forEach(shorturl => {
  if (shorturl === "type-is-your-right") {
    router.get("/" + shorturl, function(req, res, next) {
      res.render("writing/" + shorturl + "/" + shorturl + ".html", { title: 'type is your right' });
    });
  } if (shorturl === "baas") {
    router.get("/" + shorturl, function(req, res, next) {
      res.render("writing/" + shorturl + "/" + shorturl + ".html", { title: 'baas' });
    });
  } else { // most articles are "the"-something
    router.get("/the-" + shorturl, function(req, res, next) {
      res.render("writing/" + shorturl + "/" + shorturl + ".html", { title: shorturl });
    });
  }
});

module.exports = router;
