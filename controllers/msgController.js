const MessageModel = require("../Models/messages");
const ChatModel = require("../Models/chat");

const createMsg = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { sender, messageBody } = req.body;
    console.log(req.params);
    console.log(req.body);

    const newMessage = new MessageModel({
      chatId,
      sender,
      messageBody,
    });
    await newMessage.save();

    res
      .status(201)
      .json({ message: "Message added to chat successfully", newMessage });
  } catch (error) {
    console.error("Error adding message to chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMsgs = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const messages = await MessageModel.find({ chatId }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createMsg, getMsgs };
