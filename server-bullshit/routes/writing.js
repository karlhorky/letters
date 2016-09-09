var express  = require('express');
var router   = express.Router();
var nunjucks = require('nunjucks');
var fs       = require('fs');
var path     = require('path');
var glob     = require("glob");

var pathToLongFormContent = "./views/long-form/";
var shorturls = [];

var files = glob.sync("**/*.html", {cwd: pathToLongFormContent});

function indexLongformWriting() {
  var shorturl;

  files.forEach(file => {
    if (file === "long-form.html") {
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
  res.render('long-form/long-form.html', { 
    title: 'read some cool stuff',
    longFormTitles: shorturls
  });
});

shorturls.forEach(shorturl => {
  router.get("/the-" + shorturl, function(req, res, next) {
    res.render("long-form/" + shorturl + "/" + shorturl + ".html", { title: 'lsjdkflkdsjalfj' });
  });
});

module.exports = router;
