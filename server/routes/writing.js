var express   = require('express');
var router    = express.Router();
var nunjucks  = require('nunjucks');
var fs        = require('fs');
var path      = require('path');
var glob      = require("glob");
var yamlFront = require("yaml-front-matter");

var pathToLongFormContent = "./views/writing/";
var shorturls = [];
var blogPostTitles = [];
var blogPostTitle;
var results = [];
var result;

var files = glob.sync("**/*.html", {cwd: pathToLongFormContent});

function indexLongformWriting() {
  var shorturl;

  files.forEach(file => {
    if (file === "writing.html") {
      return;
    }

    var contents = fs.readFileSync(path.join(pathToLongFormContent, file));
    result = yamlFront.loadFront(contents);
    results.push(result);

    shorturl = file.match(/(.*)\.html$/)[1];
    shorturl = shorturl.substring(shorturl.indexOf("/") + 1);
    shorturls.push(shorturl);

    shorturls = shorturls.sort().reverse();
  });
}

indexLongformWriting();

// shorturls.forEach(shorturl => {
//   blogPostTitle = shorturl.substring(6);
//   blogPostTitles.push(blogPostTitle);
// });

console.log(results);

/* GET writing page. */
router.get('/', function(req, res, next) {
  res.render('writing/writing.html', { 
    title: 'Writing',
    longFormTitles: results
  });
});

shorturls.forEach(shorturl => {
  var blogPostTitle = shorturl.substring(6);

  // if (shorturl === '16-08-type-is-your-right') {
  //   router.get('/' + blogPostTitle, function(req, res, next) {
  //     res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: 'Type is Your Right!' });
  //   });
  // } else if (shorturl === '15-11-baas') {
  //   router.get('/' + blogPostTitle, function(req, res, next) {
  //     res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: 'Baas' });
  //   });
  // } else if (shorturl === '16-12-2016-in-review') {
  //   router.get('/' + blogPostTitle, function(req, res, next) {
  //     res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: '2016, Impassioned' });
  //   });
  // } else if (shorturl === '14-03-design-resources') {
  //   router.get('/the-' + blogPostTitle, function(req, res, next) {
  //     res.redirect('https://medium.com/@helenvholmes/design-resources-d6942068448a');
  //   });
  // } else if (shorturl === '14-04-only-woman-at-the-table') {
  //   router.get('/the-' + blogPostTitle, function(req, res, next) {
  //     res.redirect('https://medium.com/women-in-tech/the-only-woman-at-the-table-e6854e824bdc#.x8s8sq764');
  //   });
  // } else if (shorturl === '15-04-professor-y') {
  //   router.get('/the-' + blogPostTitle, function(req, res, next) {
  //     res.redirect('https://medium.com/@helenvholmes/professor-y-9036a8a918d4#.skrqfyttw');
  //   });
  // } else { // most articles are 'the'-something
  router.get('/the-' + blogPostTitle, function(req, res, next) {
    res.render('writing/' + blogPostTitle + '/' + shorturl + '.html', { title: blogPostTitle.replace(/-/g, ' ') });
  });
  // }
});

module.exports = router;
