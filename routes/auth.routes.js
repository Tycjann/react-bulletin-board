const express = require('express');
const passport = require('passport');
const router = express.Router();

// przekierowanie do logownia Google
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

// sprawdzenie, czy to zalogowanie się udało
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged');
  }
);

// logout
router.get('/logout', function (req, res) {
  // req.logout(function (err) {
  //   if (err) { return next(err); }
  //   res.redirect('/');
  //   // console.log('sss1');
  // });
  req.logout();
  res.redirect('/');
  // console.log('sss2');
});

module.exports = router;