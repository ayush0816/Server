const express = require("express");
const db = require("./database/db");
const http = require("http");
const { initialize, getIO } = require("./ConfigWS/configWS");
const cors = require("cors");
const UserdbModel = require("./Models/userdb");
const app = express();

const port = 8080;

app.use(cors()); // for cross origin resource sharing

// middleware to parse JSON and covert them into js objects
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

const userRooms = {};

// Function to get a user message using userID from database
const getUserMessages = async (userID) => {
  try {
    const userCursor = await db.collection("userdb").find({ userID: userID });
    const user = await userCursor.toArray();

    if (user.length > 0) {
      console.log("user", user);
      const messages = user.map((field) => field.message); // Assuming you want to retrieve the 'data' field
      return messages;
    }
    return [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

// Establishing a socket connection

io.on("connection", (socket) => {
  console.log("A user connected");

  // Making different chat room for a given user
  socket.on("joinRoom", async (userID) => {
    socket.join(userID); // Join the specified chat room
    console.log(typeof(userID) , userID);
    const userMessages = await getUserMessages(userID);
    console.log("userRooms:", userMessages);
    socket.emit("allMessages", userMessages);
  });

  // For sending the message in real time
  socket.on("message", async (data) => {
    const { userID, message } = data;
    try {
      const timestamp = new Date();

      // storing the new message in the database
      await db.collection("userdb").insertOne({
        userID: userID,
        timestamp: timestamp,
        message: message,
      });

      io.to(userID).emit("newMessage", message);
    } catch (error) {
      socket.emit("error", "Failed to add the data in DB");
    }
  });

  // For disconnecting the real time connection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpserver.listen(port, () => {
  console.log(`kudos! App is up and running at port : ${port}`);
});
