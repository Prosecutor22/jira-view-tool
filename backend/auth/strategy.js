var passport = require('passport');
var LocalStrategy = require('passport-local');
var {authenticateAdmin, authenticateTeam} = require('./auth');

const adminStrategy = new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await authenticateAdmin(username, password);
        if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
        else return cb(null, user);
    } catch (error) {
        cb(error);
    }   
});

const teamStrategy = new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await authenticateTeam(username, password);
        if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
        else return cb(null, user);
    } catch (error) {
        cb(error);
    }   
});

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, { id: user.id, role: user.role });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = {adminStrategy, teamStrategy}