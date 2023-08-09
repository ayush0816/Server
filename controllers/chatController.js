const ChatModel = require("../Models/chat");
const UserModel = require("../Models/user");

const createChat = async (req, res) => {
  try {
    const { chatname, urgent } = req.body;
    console.log(req.body);
    const userId = req.id;

    const chat = new ChatModel({
      userid: userId,
      chatname,
      urgent,
    });
    console.log(userId);
    await chat.save();
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.chatMsgs.push({ chatid: chat._id });
    await user.save();

    res.status(201).json({ message: "Chat created successfully", chat });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
