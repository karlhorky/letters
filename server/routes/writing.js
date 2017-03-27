var express   = require('express');
var fs        = require('fs');
var glob      = require("glob");
var nunjucks  = require('nunjucks');
var path      = require('path');
var router    = express.Router();
var yamlFront = require("yaml-front-matter");

var dirpath = "./views/writing/";
var shorturls = [];
var blogPostTitles = [];
var blogPostTitle;
var results = [];
var result;

var files = glob.sync("**/*.html", {cwd: dirpath});

function indexLongformWriting() {
  var shorturl;

  files.forEach(file => {
    if (file === "writing.html") {
      return;
    }

    var contents = fs.readFileSync(path.join(dirpath, file));
    result = yamlFront.loadFront(contents);
    results.push(result);
  });
}

indexLongformWriting();

results = results.reverse();

/* GET writing page. */
router.get('/', function(req, res, next) {
  res.render('writing/writing.html', { 
    title: 'Writing',
    longFormTitles: results
  });
});

results.forEach(result => {
  router.get('/' + result.url, function(req, res, next) {
    res.render('writing/' + result.file + '/' + result.file + '.html', { 
        title: result.title,
        date: result.date
      });
  });
});

module.exports = router;
