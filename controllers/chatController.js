const ChatModel = require("../Models/chat");
const UserModel = require("../Models/user");
const MessageModel = require("../Models/messages");
const UserdbModel = require("../Models/userdb");
const db = require("../database/db");

const createChat = async (req, res) => {
  try {
    const { chatname, urgent } = req.body;
    console.log(req.body);
    const userId = req.id;

    // Creating a new chat model
    const chat = new ChatModel({
      userid: userId,
      chatname,
      urgent,
    });
    console.log(userId);

    // saving the chats to the db
    await chat.save();

    // Adding those chats to usermodel db
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

const addChat = async (req, res) => {
  try {
    const { userId, message } = req.body;
    console.log(req.body);
    const timestamp = new Date();

    // Creating a new chat model
    const chat = new UserdbModel({
      userID: userId,
      timestamp: timestamp,
      data: message,
    });

    // saving the chats to the db
    await chat.save();

    res.status(201).json({ message: "Chat created successfully", chat });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getChats = async (req, res) => {
  try {
    // Finding the user by userid
    const user = await UserModel.findById(req.id);
    if (!user) {
      console.log("User not found!!");
      return res.status(404).json({ message: "User not found" });
    }

    // Fetching user messages using chat ids
    const chatIds = user.chatMsgs.map((chatMsg) => chatMsg.chatid);
    const messages = await MessageModel.find({ chatId: { $in: chatIds } });

    // Organize messages by chatId
    const messagesByChat = {};
    messages.forEach((message) => {
      if (!messagesByChat[message.chatId]) {
        messagesByChat[message.chatId] = [];
      }
      messagesByChat[message.chatId].push(message);
    });

    res.status(200).json({ messagesByChat });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createChat, getChats, addChat };
