const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: String,
    required: true,
  },
});

const UserdbModel = mongoose.model("userdb", userSchema);

module.exports = UserdbModel;
