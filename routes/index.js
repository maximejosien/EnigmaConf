var express = require('express');
var router = express.Router();

const Conference = require('../models/conference').Conference;
const localStorage = require('localStorage');

/* GET home page. */
router.get('/', function(req, res, next) {
  Conference.find({}, (err, conferences) => {
    res.render('homepage/index', {
      conferences: conferences,
      userId: localStorage.getItem('user')
    });
  });
});

module.exports = router;
