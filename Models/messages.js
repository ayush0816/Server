const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  sender: {
    type: String,
    required: true,
  },
  messageBody: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model("ChatMessage", chatSchema);

module.exports = MessageModel;
