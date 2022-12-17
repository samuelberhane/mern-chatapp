const express = require("express");
const router = express.Router();
const {
  getMessages,
  createdMessage,
} = require("../controllers/messageController");

// created message
router.post("/", createdMessage);

// get messages
router.post("/messages", getMessages);

module.exports = router;
