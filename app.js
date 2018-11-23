require("dotenv").config();

const express = require("express");
const app = express();

const passport = require("passport");
const FacebookPassport = require("passport-facebook");
const session = require("express-session");
const bodyParser = require('body-parser');
// const cookieSession = require("cookie-session");

const profileMiddleware = require("./middlewares/profile.middleware");

const mongoose = require("mongoose");
const User = require("./db");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/auth/fb", passport.authenticate("facebook"));

app.get(
  "/auth/fb/cb",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);
// profileMiddleware.checkPermission,
app.get("/profile" ,(req, res) => {
  console.log("````````````````````````````````````````` req.user: ");
  console.log(req.user);
  console.log("````````````````````````````````````````````````````");
  res.render("profile");
});

app.get('/testAuth', middleware);

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/')
})

function middleware(req,res,next){
  if(req.isAuthenticated()){
    res.redirect('/authenticated')
  }
  res.redirect('/notAuthenticated')
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listenning at ${PORT}`));

mongoose.connect(
  "mongodb://balo11044:nblong1997@ds113134.mlab.com:13134/fblogintestdb",
  err => {
    if (err) console.error(err);
    else console.log("DB connect success!");
  }
);

passport.use(
  new FacebookPassport(
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

passport.serializeUser((user, done) => {
  console.log("//////////////////////////");
  console.log(`serrialize user: user id :${user.facebookId}`);
  console.log("//////////////////////////");
  done(null, user.facebookId);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id }).then(user => {
    req.user = user;
    done(null, user);
  });
});
