const express = require("express");
const db = require("./database/db");

const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/chat", require("./routes/createChat"));
app.use("/api/msg", require("./routes/createMsg"));

app.listen(port, () => {
  console.log(`kudos! App is up and running at port : ${port}`);
});
