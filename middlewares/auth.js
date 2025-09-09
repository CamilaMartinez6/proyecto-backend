const passport = require('passport');

const current = passport.authenticate('jwt', { session: false }); 
module.exports = { current };
