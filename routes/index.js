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
  res.render('browse', { title: 'Browse the Colenso Project' });
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search the Colenso Project' });
});

router.get('/searchresults', function(req, res) {
  res.render('search_results', { title: 'My Movie Store', content: req.query.searchString });
});

module.exports = router;
/*
router.get("/search/results", function(req, res){
  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" +
  " (//name[@type='place'])[1 to 10] ",
  function (error, result) {
    if(error){ console.error(error);}
    else {
      res.render('searchResults', {results: result.result});
    }
  });
});
*/
/*
router.get("/",function(req,res){
client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" +
" (//name[@type='place'])[1] ",
function (error, result) {
if(error){ console.error(error);}
else {
res.render('index', { title: 'ECS Video Rental', place: result.result });
}
}
);
});
*/
/*
router.get('/search/results', function(req, res) {
  var queries = req.query;
  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; " +
  "//name[@type = 'place' and position() = 1 and . = '” + queries.mysearch + ”']",
  function(err,res) { if(!err) console.log(res.result)} )
  res.render('search_results', { title: 'Search Results', content: queries.searchString});
  //, content: req.query.searchString });
});
*/
