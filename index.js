const express = require("express");
const db = require("./database/db");
const http = require("http");
const { initialize, getIO } = require("./ConfigWS/configWS");

const app = express();
const port = 8080;

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

io.sockets.on("connection", function (socket) {
  socket.on("join", (message) => {
    socket.join(message.roomid);
    console.log("join");
  });
});

httpserver.listen(port, () => {
  console.log(`kudos! App is up and running at port : ${port}`);
});
