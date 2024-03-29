var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  //redirect signed in users to accounts page
  if(req.user) res.redirect('/accounts');
  res.render('index');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/accounts',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
