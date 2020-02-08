require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./db");

app.use(cors());
app.use(bodyparser.json());

app.listen(3000, async () => {
  await db.migrate(process.env.DB_NAME);
  await db.connect(process.env.DB_NAME);
  console.log("Running on port 3000");
});
