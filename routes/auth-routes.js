const express = require('express');
const router = express.Router();

const passport = require('passport');

module.exports = router;


router.get("/login", (req, res) => res.render("login"));
router.get("/fb", passport.authenticate("facebook"));
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get(
  "/fb/cb",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login"
  })
);

router.get('/google/cb', passport.authenticate('google',{
  successRedirect: "/profile",
  failureRedirect: "/auth/login"
}));

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
  });