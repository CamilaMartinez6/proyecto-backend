const express = require('express');
const passport = require('passport');
const { current, login, forgotPassword, getResetPassword, postResetPassword } = require('../controllers/sessions.controller');

const router = express.Router();

router.post('/register', passport.authenticate('register', { session:false }), (req, res)=> {
  res.json({ status:'success', message:'Usuario registrado' });
});

router.post('/login', passport.authenticate('login', { session:false }), login);

router.get('/current', passport.authenticate('jwt', { session:false }), current);

router.post('/forgot-password', forgotPassword);
router.get('/reset-password', getResetPassword);
router.post('/reset-password', postResetPassword);

module.exports = router;

