const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  chatMsgs: [
    {
      chatid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chat",
      },
    },
  ],
});

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;
