const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatMsgs: [
    {
      chatid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
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

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
