const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().sort({ createdAt: -1 });
    const users = allUsers.map((user) => {
      const { password, ...userData } = user._doc;
      return userData;
    });
    res.json({ users, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

module.exports = { getUsers };
