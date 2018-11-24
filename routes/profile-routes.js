const express = require("express");
const router = express.Router();

const passport = require("passport");

const profileMiddleware = require("../middlewares/services.middleware");

module.exports = router;


router.get("/", profileMiddleware.haveAccessToRoute, (req, res) => {
  console.log("``````````````````````````````````````````req.user: ");
  console.log(req.user);
  console.log("````````````````````````````````````````````````````");
  res.render("profile", { user: req.user });
});
