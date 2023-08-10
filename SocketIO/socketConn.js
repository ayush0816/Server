const { getIO } = require("./ConfigWS/configWS");
const io = getIO();
const UserModel = require("../Models/user");
const MessageModel = require("../Models/messages");
const ChatModel = require("../Models/chat");

const chatRooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (chatID) => {
    socket.join(chatID); // Join the specified chat room
    if (!chatRooms[chatID]) {
      chatRooms[chatID] = [];
    }
    socket.emit("allMessages", chatRooms[chatID]); // Send existing messages to the joining user
  });

  socket.on("message", (data) => {
    const { chatID, message } = data;
    if (chatRooms[chatID]) {
      chatRooms[chatID].push(message);
      io.to(chatID).emit("newMessage", message); // Emit the new message to everyone in the chat room
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
