const express = require('express');
const router = express.Router();
const path = require('path');

const isLogged = (req, res, next) => {
  if (!req.user) {
    res.redirect('/account/no-permission');
    // res.sendFile(path.join(__dirname, '/views/noPermission.htm'));
  } else {
    next();
  }
};

router.use('/logged', (req, res, next) => {
  if (isLogged(req, res, next)) next();
});

router.use('/profile', (req, res, next) => {
  if (isLogged(req, res, next)) next();
});

router.get('/logged', (req, res) => {
  // res.render('logged', { displayName: req.user.displayName, avatar: req.user.photos[0].value });
  res.sendFile(path.join(__dirname, '/views/logged.htm'));
});

router.get('/profile/settings', (req, res) => {
  // res.render('profileSettings');
  res.sendFile(path.join(__dirname, '/views/profileSettings.htm'));
});

router.get('/no-permission', (req, res) => {
  // res.render('noPermission');
  res.sendFile(path.join(__dirname, '/views/noPermission.htm'));
});

module.exports = router;
