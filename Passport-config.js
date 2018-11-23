const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("./db");

passport.serializeUser((user, done) => {
  console.log("//////////////////////////");
  console.log(`serrialize user: user id :${user.id}`);
  console.log("//////////////////////////");
  done(null, user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      // clientID: "334437024023212",
      // clientSecret: "b2b63fb97643af04ee5dd490fca7b42f",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: "https://loginfbapi.herokuapp.com/auth/fb/cb"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(userFound => {
        if (!userFound) {
          const newUser = new User();
          newUser.facebookId = profile.id;
          newUser.name = profile.displayName;
          newUser.save(err => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        } else return done(null, userFound);
      });
    }
  )
);
