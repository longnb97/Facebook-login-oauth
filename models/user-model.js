const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  facebookId: { type: String },
  name: String,
  avatarUrl: { type: String, default: "default.img" }
});

module.exports = mongoose.model("user", UserModel);
