const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 4,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
