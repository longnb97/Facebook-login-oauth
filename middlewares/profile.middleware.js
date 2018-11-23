module.exports = {
  checkPermission
};

function checkPermission(req, res, next) {
  if (!req.user.displayName) {
    console.log(`middleware: please login first`);
    res.redirect("/login");
  } else {
    console.log(`hello ${req.user.displayName}`);
    next();
  }
}
