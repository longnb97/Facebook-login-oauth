module.exports = {
  haveAccessToRoute
};

function haveAccessToRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else res.redirect("/");
}