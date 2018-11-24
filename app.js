require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const passport = require("passport");
const cookieSession = require("cookie-session");

const PassportSetup = require("./configs/Passport-config");
const MongoDbConnection = require("./configs/mongoDb-config");

const key = require("./configs/keys");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session",
    keys: [key.session.secret],
    maxAge: 24 * 60 * 60 * 1000,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth-routes"));
app.use("/profile", require("./routes/profile-routes"));
app.use("/image", require("./routes/image-routes"));

app.get("/", (req, res) => res.render("index", { user: req.user }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listenning at ${PORT}`));
