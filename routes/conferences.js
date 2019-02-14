var express = require('express');
var router = express.Router();

const localStorage = require('localStorage');
const Conference = require('../models/conference').Conference;
const User = require('../models/user').User;

let errorCreate = null;

router.get('/get/:conferenceId', function(req, res, next) {
  res.render('./conferences/get/index', {
    userId: localStorage.getItem('user')
  });
});

router.get('/add', (req, res, next) => {
  if (!localStorage.getItem('user')) {
    res.render('./users/login', {
      userId: localStorage.getItem('user')
    })
  }
  res.render('./conferences/add/index', {
    userId: localStorage.getItem('user'),
    error: errorCreate
  });
});

router.post('/post', (req, res, next) => {

  if (!(req.body.name && req.body.firstName && req.body.lastName && req.body.date)) {
    errorCreate = "Une erreur est survenue dans le formulaire";
    res.redirect('/conferences/add');
  }

  const newConference = new Conference({
    name : req.body.name,
    speaker : {
      firstName : req.body.firstName,
      lastName : req.body.lastName
    },
    date: req.body.date,
    users : [],
    ownerId: localStorage.getItem('user')
  });

  newConference.save((err, newConference) => {
  });
  res.redirect('/');
});

router.get('/join/:conferenceId', (req, res, next) => {
  let userId = localStorage.getItem('user');
  User.findOne({ _id: userId }, function(err, user) {
    if (user != null) {
      Conference.findOne({ _id: req.params.conferenceId }, (err, conference) => {
        let nb = 0;
        for (let i = 0; i < conference.users.length; i++) {
          if (conference.users[i]._id == userId) {
            nb++;
          }
        }
        console.log()
        if (nb === 0) {
          conference.users.push(user);
          conference.save((err, newConference) => {
          });
        }
        res.redirect('/')
      });
    } else {
      res.redirect('/users/login')
    }
  });
});

router.get('/list', (req, res, next) => {
  res.render('./conferences/list', {
    userId: localStorage.getItem('user')
  });
});

router.get('/delete/:conferenceId', (req, res, next) => {
  Conference.deleteOne({ _id: req.params.conferenceId }, (err) => {
  });
  res.redirect('/users/' + localStorage.getItem('user') + '/conferences');
});

router.get('/edit/:conferenceId', (req, res, next) => {
  if (!localStorage.getItem('user')) {
    res.render('./users/login', {
      userId: localStorage.getItem('user')
    })
  }
  Conference.findOne({ _id: req.params.conferenceId }, (err, conference) => {
    res.render('./conferences/edit/index', {
      userId: localStorage.getItem('user'),
      conference: conference
    });
  });
});

router.post('/update/;conferenceId', (req, res, next) => {
  Conference.updateOne({ _id : req.params.conferenceId }, {
    name : req.body.name,
    speaker : {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
    },
    date : req.body.date
  }, (err, conference) => {
  });
});

module.exports = router;
