const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  id: { type: String },
  name: String,
  name: String
});

module.exports = mongoose.model("user", UserModel);
