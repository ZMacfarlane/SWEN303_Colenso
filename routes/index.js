var express = require('express');
var router = express.Router();
var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Colenso Project' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About the Colenso Project' });
});

/* GET browse documents page. */
router.get('/browse', function(req, res, next) {
  client.execute("XQUERY db:list('Colenso')",
  function (error, result) {
    if(error){console.error(error);}
    else{
      list = result.result.split("\r\n");
      res.render('browse', { title: 'Browse Documents', list: list });
    }
  }
);
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search the Colenso Project' });
});

router.get('/searchresults', function(req, res) {
  res.render('search_results', { title: 'Search the Colenso Project', content: req.query.searchString });
});

module.exports = router;
