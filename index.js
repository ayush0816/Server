const express = require("express");
const db = require("./database/db");
const http = require("http");
const { initialize, getIO } = require("./ConfigWS/configWS");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/createChat"));
app.use("/api/msg", require("./routes/createMsg"));

const httpserver = http.createServer(app);
initialize(httpserver, {
  cors: {
    origin: "*",
  },
});

const io = getIO();
// var chatRooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (chatID) => {
    socket.join(chatID); // Join the specified chat room
    // if (!chatRooms[chatID]) {
    //   chatRooms[chatID] = [];
    // }
    // console.log("chatRooms: ", chatRooms)
    // socket.emit("allMessages", chatRooms[chatID]); // Send existing messages to the joining user
  });

  socket.on("message", (data) => {
    const { chatID, message } = data;
    // if (chatRooms[chatID]) {
    //   chatRooms[chatID].push(message);
    //   console.log(chatID,message);
  // }
      io.to(chatID).emit("newMessage", message); // Emit the new message to everyone in the chat room
    }
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpserver.listen(port, () => {
  console.log(`kudos! App is up and running at port : ${port}`);
});
