const express = require("express");
const app = express();

const passport = require("passport");
const FacebookPassport = require("passport-facebook").Strategy;
const session = require("express-session");

const mongoose = require("mongoose");
const db = require("./db");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "reveal",
    cookie: {
      expires: 1000 * 60 * 60
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/auth/fb", passport.authenticate("facebook"));
app.get(
  "/auth/fb/cb",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/"
  })
);

app.get("/auth/fb/cb", passport.authenticate("facebook"), (req, res)=> {
  res.send('authenticated')
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listenning art ${PORT}`));

mongoose.connect("mongodb://balo11044@ds145072.mlab.com:45072/quanlynhahang",(err)=>{
  if (err) console.error(err)
  else console.log("DB connect success!")
})


passport.use(
  new FacebookPassport(
    {
        // clientID: "334437024023212",
      // clientSecret: "b2b63fb97643af04ee5dd490fca7b42f",
      clientID: "584736121976309",
      clientSecret: "b2b63fb97643af04ee5dd490fca7b42f",
      callbackURL: "https://loginfbapi.herokuapp.com/auth/fb/cb"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.findOne({ id }).then(user => {
    done(null, user);
  });
});