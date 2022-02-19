const express = require('express');
const doctorRouter = require('./routes/doctorRouter.js');
const patientRouter = require('./routes/patientRouter.js');
const appointmentRouter = require('./routes/appointmentRouter.js');
const messagingRouter = require('./routes/messageRouter.js');
const documentRouter = require('./routes/documentRouter');
const notificationRouter = require('./routes/notificationRouter');
const ambulanceRouter = require('./routes/ambulanceRouter');

const session = require('express-session')

const errorset = require('./utils/error');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


////////////////////////////////////////////////////////////////////////////////////////

const passport = require('passport')

const facebookStrategy = require('passport-facebook').Strategy

app.use(session({ secret: 'ilovescotchscotchyscotchscotch',resave: true,
saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy({

    clientID: "603496006962121",
    clientSecret: "c63a6f6f8189ed75b5958b2c0c0e7341",
    callbackURL: "http://localhost:5000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

},
    function (token, refreshToken, profile, done) {

        console.log(profile)
        return done(null, profile)
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    return done(null, user)
});

app.get('/profile', (req, res) => {
    res.send("you are authenticated")
})

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email,user_photos' }));

app.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));




/////////////////////////////////////////////////////////////









app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/appointment', appointmentRouter);
app.use('/api/v1/messenger', messagingRouter);
app.use('/api/v1/document', documentRouter);

app.use('/api/v1/notification', notificationRouter);

app.use('/api/v1/ambulance', ambulanceRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status:"failed",
    //     message: `invalid url,${req.originalUrl}`
    // })
    const err = new errorset(404, `invalid url 1${req.url}`);
    next(err);
})
app.use((err, req, res, next) => {
    res.status(404).json({
        status: "failed",
        message: err.message
    })
})

module.exports = app;