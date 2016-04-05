var _        = require('lodash');
var express  = require('express');
var http     = require('http');
var marked   = require('marked');
var nunjucks = require('nunjucks');
var request  = require('request');
var router   = express.Router();

var numberOfLetters = 0;
var lettersResponse = {};
var letterTitles = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeCall () {
  // here we make a call using request module
  request.get({
    uri: 'https://api.github.com/repos/helenvholmes/letters/contents/arbitrary-folder/',
    json: true,
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'User-Agent': 'Letters'
    }
    },
    function (error, res, object) {
      if (error) {
        console.log(error);
      }

      if (res.statusCode === 200 ) {
        numberOfLetters = res.body.length;
        lettersResponse = res.body;

        for (var i = 0; i < numberOfLetters; i++) {
          letterTitles.push(lettersResponse[i].name);
        }

        return lettersResponse;
      }
    }
  );
}

makeCall();

// GET letters listing.
router.get('/', function(req, res, next) {
  res.render('letters.html', { 
    title: 'Letters',
    letterTitles: letterTitles
  });
});

// GET letters listing.
router.get('/random', function(req, res, next) {
  var randomNumber = getRandomInt(0, numberOfLetters);

  request(lettersResponse[randomNumber].download_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedResponse = marked(body);
      console.log(parsedResponse);
      res.render('letter.html', { 
        title: 'Letters',
        letter: parsedResponse
      });
    }
  });
});

router.get('/:name', function(req, res) {
  var indx = _.findIndex(lettersResponse, ['name', req.params.name]);

  request(lettersResponse[indx].download_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedResponse = marked(body);
      res.render('letter.html', {
        title: 'Letter: ' + req.params.name,
        letter: parsedResponse
      });
    }
  });
});

module.exports = router;
