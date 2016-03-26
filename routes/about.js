var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About the Colenso Project' });
});

module.exports = router;
