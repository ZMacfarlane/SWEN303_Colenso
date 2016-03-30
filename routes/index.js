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
  client.execute("XQUERY declare namespace tei = 'http://www.tei-c.org/ns/1.0'; " +
  "for $p in *[.//text() contains text '" + req.query.searchString + "'] return db:path($p)",
  function(error,result) {
    if(error){console.error(error);}
    else{
      list = result.result.split("\r\n");
      numResults = list.length;
      res.render('search_results', { title: 'Search the Colenso Project', content: req.query.searchString, list: list, numResults: numResults});
    }});
});

/*View file at link. */
router.get('/viewFile', function(req, res){
    client.execute("XQUERY doc('Colenso/" + req.query.path +"')",
    function(error, result) {
      if(error){console.error(error);}
      else{
        res.render('view_file', {title: 'Here is your file', path: req.query.path, file: result.result});
      }
    })
});

router.get('/download', function(req, res){
    path = req.query.path.split('/');
    name = path[path.length - 1];
    client.execute("XQUERY doc('Colenso/" + req.query.path + "')",
      function(error, result){
        if(error){console.error(error);}
        else{
          res.writeHead(200, {'Content-type': 'text/TEI; filename=' + name});
          res.write(result.result);
          res.end();
        }
      })
});

module.exports = router;
