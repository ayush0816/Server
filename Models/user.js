const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatMsgs: [
    {
      chatid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chat",
      },
      msgid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ChatMessage",
      },
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
