const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  chatname: {
    type: String,
    required: true,
  },
  agentid: {
    type: String,
    ref: "Agent",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
