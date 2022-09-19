const express = require('express');
const passport = require('passport');
const router = express.Router();

// redirection to Google login
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// checking login was successful
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/account/no-permission' }),
  (req, res) => {
    res.redirect('/account/logged');
  }
);

// logout
router.get('/logout', function (req, res) {
  // req.logout(function (err) {
  //   if (err) { return next(err); }
  //   res.redirect('/');
  //   // console.log('logout-function');
  // });
  // req.logout();
  res.redirect('/');
  console.log('logout');
});

module.exports = router;