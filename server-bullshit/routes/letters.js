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
var pathToLetters = "/Users/hholmes/Library/Mobile\ Documents/27N4MQEA55~pro~writer/Documents/Letters/arbitrary-folder";
var postIndex = {};
var allPosts = [];

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// nconf.argv().env('_').file({
//   file: path.join(__dirname, '../config/config.json')
// });

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

// function _runQuery(opts) {
//   opts = opts || {};
//   var posts = allPosts;

//   if(opts.filter) {
//     for(var name in opts.filter) {
//     posts = posts.filter(x => {
//       if(x[name] && x[name].length) {
//         return x[name].indexOf(opts.filter[name]) !== -1;
//       }

//       var val = x[name] === undefined ? false : x[name];
//         return val === opts.filter[name];
//       });
//     }
//   }

//   if(opts.select) {
//     posts = posts.map(x => {
//       return t.toObj(opts.select, t.map(name => [name, x[name]]));
//     });
//   }

//   if(opts.limit) {
//     posts = posts.slice(0, opts.limit);
//   }

//   return posts;
// }

// function queryPosts(query) {
//   query = mergeObj(query, {
//     filter: mergeObj(query.filter || {}, { published: true })
//   });
//   return _runQuery(query);
// }

// var parsedResponse = marked(body);
//       console.log(parsedResponse);
//       res.render('letter.html', { 
//         title: 'Letters',
//         letter: parsedResponse

indexPosts(pathToLetters);
// console.log(process.env.PATH)

// GET letters listing.
router.get('/', function(req, res, next) {
  res.render('letters.html', { 
    title: 'Letters',
    letterTitles: allPosts
  });
});

// GET letters listing.
// router.get('/random', function(req, res, next) {
//   var randomNumber = getRandomInt(0, numberOfLetters);

//   res.render('letter.html', { 
//     title: 'Letters',
//     letter: parsedResponse
//   });
// });

router.get('/:name', function(req, res) {
  var indx = _.findIndex(allPosts, ['shorturl', req.params.name]);
  var parsedResponse = marked(allPosts[indx].toString());

  res.render('letter.html', {
    title: 'Letter: ' + req.params.name,
    letter: parsedResponse
  });
});

module.exports = router;
