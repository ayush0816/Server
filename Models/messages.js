const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Agent",
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

const ChatMessage = mongoose.model("ChatMessage", chatSchema);

module.exports = ChatMessage;
