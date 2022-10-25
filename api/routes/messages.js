const express = require("express");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const router = express.Router();
// add message
router.post("/", async (req,res) => {
  console.log(req.body);
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all messages in Conversation
router.get("/:conversationId", async (req,res) => {
  try {
    const messages = await Message.find({
      conversationId:req.params.conversationId
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
