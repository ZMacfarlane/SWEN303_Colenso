var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Search the Colenso Project' });
});

module.exports = router;
