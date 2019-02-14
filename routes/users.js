var express = require('express');
var router = express.Router();

const User = require('../models/user').User;
const localStorage = require('localStorage');

const Conference = require('../models/conference').Conference;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', (req, res, next) => {
  res.render('./users/add/index', {
    userId: localStorage.getItem('user')
  });
});

router.post('/post', (req, res, next) => {

  const newUser = new User({
    email : req.body.email,
    firstName  : req.body.firstName,
    lastName : req.body.lastName,
    password: req.body.password
  });

  newUser.save((err, newUser) => {
  });
  res.redirect('/');
});

router.get('/login', (req, res, next) => {
  res.render('./users/login/index', {
    userId: localStorage.getItem('user')
  });
});

router.post('/connect', (req, res, next) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user != null) {
      localStorage.setItem('user', user._id);
      res.redirect('/');
    } else {
      res.redirect('./login')
    }
  });
});

router.get('/:userId/conferences', (req, res, next) => {
  let userId = req.params.userId;
  Conference.find({ ownerId : userId }, (err, conferences) => {
    res.render('conferences/listUser/index', {
      conferences: conferences,
      userId: localStorage.getItem('user')
    });
  });
});

router.get('/disconnect', (req, res, next) => {
  localStorage.removeItem('user');
  res.redirect('/');
});

module.exports = router;
