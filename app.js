require("dotenv").config();

const express = require("express");
const app = express();

const passport = require("passport");
const bodyParser = require("body-parser");

// const session = require("express-session");
const cookieSession = require("cookie-session");

const profileMiddleware = require("./middlewares/profile.middleware");
const PassportSetup = require("./Passport-config");

const mongoose = require("mongoose");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "anything",
//     cookie: {
//       secure: true,
//       maxAge: 60 * 60 * 1000
//     }
//   })
// );
let secret = "maythetokenbewithyou";
app.use(
  cookieSession({
    name: "session",
    keys: [secret],
    maxAge: 24 * 60 * 60 * 1000,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render("index"));
app.get("/login" , (req, res) => res.render("login"));
app.get("/auth/fb", passport.authenticate("facebook"));

app.get(
  "/auth/fb/cb",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);
// profileMiddleware.checkPermission,
app.get("/profile",(req, res) => {
  console.log("````````````````````````````````````````` req.user: ");
  console.log(req.user);
  console.log("````````````````````````````````````````````````````");
  res.render("profile");
});

app.get("/testAuth", middleware);

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

function middleware(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/authenticated");
  } else res.redirect("/notAuthenticated");
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
