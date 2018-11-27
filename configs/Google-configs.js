const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/user-model");

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: 'https://loginfbapi.herokuapp.com/auth/google/cb'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log(profile);
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleToken : accessToken,
                    googleRefreshToken : refreshToken,
                    googleId: profile.id,
                    name: profile.displayName
                }).save().then(newUser => {

                    done(null, newUser);
                });
            }
        });
    })
);

passport.serializeUser((user, done) => {
    console.log("//////////////////////////");
    console.log(`serrialize user: user id :${user.id}`);
    console.log("//////////////////////////");
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }).then(user => {
        done(null, user);
    });
});
