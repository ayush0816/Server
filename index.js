const express = require("express");
const db = require("./database/db");
const http = require("http");
const { initialize, getIO } = require("./ConfigWS/configWS");
const cors = require("cors");
const UserdbModel = require("./Models/userdb");
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

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("joinRoom", (chatID) => {
//     socket.join(chatID); // Join the specified chat room
//     if (!chatRooms[chatID]) {
//       chatRooms[chatID] = [];
//     }
//     console.log("chatRooms: ", chatRooms);
//     socket.emit("allMessages", chatRooms[chatID]); // Send existing messages to the joining user
//   });

//   socket.on("message", (data) => {
//     const { chatID, message } = data;
//     if (chatRooms[chatID]) {
//       chatRooms[chatID].push(message);
//       console.log(chatID, message);
//     }
//     io.to(chatID).emit("newMessage", message); // Emit the new message to everyone in the chat room
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
const userRooms = {};

const getUserMessages = async (userID) => {
  try {
    const userCursor = await db.collection("userdb").find({ "userID": userID });
    const user = await userCursor.toArray();

    if (user.length > 0) {
      console.log("user", user)
      const messages = user.map((field)=>field.message); // Assuming you want to retrieve the 'data' field
      return messages;
    }
    return [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async (userID) => {
    socket.join(userID); // Join the specified chat room
    const userMessages = await getUserMessages(userID);
    console.log("userRooms:", userMessages);
    socket.emit("allMessages", userMessages); 
  });

  socket.on("message", async (data) => {
    const { userID, message } = data;
    try {
      const timestamp = new Date();
      
      await db.collection("userdb").insertOne({
        userID: userID,
        timestamp: timestamp,
        message: message // I assume you want to store the message in the 'data' field as per your schema
      });
      
      io.to(userID).emit("newMessage", message);
    } catch (error) {
      socket.emit("error", "Failed to add the data in DB");
    }
  });
  

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


httpserver.listen(port, () => {
  console.log(`kudos! App is up and running at port : ${port}`);
});
