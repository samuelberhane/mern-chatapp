const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getMessages,
  createdMessage,
} = require("../controllers/messageController");

router.use(requireAuth);

// created message
router.post("/", createdMessage);

// get messages
router.post("/messages", getMessages);

module.exports = router;
