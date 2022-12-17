const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("username", username, "email", email, "password", password);
    const usernameExists = await User.findOne({ username });
    console.log();
    if (usernameExists)
      return res.json({ message: "Username Already Exists!", status: false });
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.json({ message: "Email Already Exists!", status: false });
    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.json({ message: "Account Created Successfully!", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// login user
const login = async (req, res) => {
  const { username, password } = req.body;
  const usernameExists = await User.findOne({ username });
  if (!usernameExists)
    return res.json({ message: "Username Doesn't Exists!", status: false });
  const checkPassword = await bcrypt.compare(password, usernameExists.password);
  if (!checkPassword)
    return res.json({ message: "Incorrect Password!", status: false });
  const token = jwt.sign({ _id: usernameExists._id }, process.env.SECRET, {
    expiresIn: "6h",
  });
  const { password: userPassword, ...userData } = usernameExists._doc;
  res.json({ userData, token, status: true });
};

module.exports = { register, login };
