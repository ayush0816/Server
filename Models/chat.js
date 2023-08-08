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
  agent: {
    type: String,
    required: true,
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
  agentHaveAccess: {
    type: Boolean,
    default: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
