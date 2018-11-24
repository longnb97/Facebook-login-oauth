const express = require('express');
const router = express.Router();

const passport = require('passport');

module.exports = router;


app.get("/login", (req, res) => res.render("login"));
app.get("/fb", passport.authenticate("facebook"));


app.get(
  "/fb/cb",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login"
  })
);

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
  });