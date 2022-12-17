const Message = require("../models/messageModal");

// create message
const createdMessage = async (req, res) => {
  try {
    const { from, to, text } = req.body;
    await Message.create({
      text,
      sender: from,
      users: [from, to],
    });
    res.status(200).json({ message: "Message Created!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all messages
const getMessages = async (req, res) => {
  const { from, to } = req.body;
  try {
    let messages = await Message.find({
      users: { $all: [from, to] },
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createdMessage, getMessages };
