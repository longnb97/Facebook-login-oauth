module.exports = {
  checkPermission
};

function checkPermission(req, res, next) {
    console.log(req.user)
  if (1+1===3) {
    console.log(`middleware: please login first`);
    res.redirect("/login");
  } else {
    console.log(`hello ${req.user.displayName}`);
    next();
  }
}
