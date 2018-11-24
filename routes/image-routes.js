const express = require("express");
const router = express.Router();

const passport = require("passport");

const authMiddleware = require('../middlewares/services.middleware');

module.exports = router;

app.get("/", authMiddleware.haveAccessToRoute, (req, res) => {
  res.render("image", { user: req.user });
});
