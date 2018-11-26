const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("../models/user-model");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://loginfbapi.herokuapp.com/auth/fb/cb"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(currentUser => {
        if (!currentUser) {
          const newUser = new User();
          newUser.facebookId = profile.id;
          newUser.name = profile.displayName;
          newUser.save(err => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        } else return done(null, currentUser);
      });
    }
  )
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
