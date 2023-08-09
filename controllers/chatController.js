const ChatModel = require("../Models/chat");
const UserModel = require("../Models/user");

const createChat = async (req, res) => {
  const chat = new ChatModel({
    userid: req.id,
    chantname: req.body.chatname,
    urgent: req.body.description,
  });

  const user = await UserModel.findById(req.id);
  if (!user) {
    console.log("User not found!!");
  }
  user.chatMsgs.push({ chatid: chat._id });
  user.save();
};
const getChats = async (req, res) => {
  try {
    const user = await UserModel.findById(req.id);
    if (!user) {
      console.log("User not found!!");
      return res.status(404).json({ message: "User not found" });
    }

    const chatIds = user.chatMsgs.map((chatMsg) => chatMsg.chatid);

    res.status(200).json({ chatIds });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createChat, getChats };
