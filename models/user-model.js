const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  name: String,
  facebookId: { type: String },
  avatarUrl: { type: String, default: "default.img" },
  googleId: { type: String },
  facebookToken: { type: String },
  facebookRefreshToken: { type: String },
  googleToken: { type: String },
  googleRefreshToken: { type: String },
  email: { type: String }
});

module.exports = mongoose.model("user", UserModel);
