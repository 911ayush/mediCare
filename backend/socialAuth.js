const app = require('./app');

const passport = require('passport')

const facebookStrategy = require('passport-facebook').Strategy

app.use(passport.initialize());
    app.use(passport.session()); 

passport.use(new facebookStrategy({

    clientID        : "603496006962121",
    clientSecret    : "c63a6f6f8189ed75b5958b2c0c0e7341",
    callbackURL     : "http://localhost:5000/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email']

},
function(token, refreshToken, profile, done) {

    console.log(profile)
    return done(null,profile)
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    return done(null,user)
});

app.get('/profile',(req,res) => {
    res.send("you are authenticated")
})

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));

app.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));



