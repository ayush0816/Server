const express = require("express");
const db = require("./database/db");

const app = express();
const port = 8080;

app.use(express.json());

app.listen(port, () => {
  console.log(`kudos! App is up and running at port : ${port}`);
});
