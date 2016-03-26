var express = require('express');
var router = express.Router();

/* GET browse documents page. */
router.get('/', function(req, res, next) {
  res.render('browse', { title: 'Browse the Colenso Project' });
});

module.exports = router;
