const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "revealed",
    cookie:{
        expires: 1000*60 //1phut
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render("index"));
app.get("/loginOK", (req, res) => res.send("dang nhap thanh cong "));
app
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/loginOK"
    })
  );
app.get("/private", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("ok");
  } else {
    res.send("ban chua login");
  }
});

passport.use(
  new LocalStrategy((username, password, done) => {
    fs.readFile("./userDB.json", (err, data) => {
      const db = JSON.parse(data);
      const userRecord = db.find(user => user.usr == username);
      if (userRecord && userRecord.pwd == password) {
        return done(null, userRecord);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.usr);
});

passport.deserializeUser((name, done) => {
  fs.readFile("./userDB.json", (err, data) => {
    const db = JSON.parse(data);
    const userRecord = db.find(user => user.usr == name);
    if (userRecord) {
      done(null, userRecord);
    } else {
      done(null, false);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server listenning at ${PORT}`));
