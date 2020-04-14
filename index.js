"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const loginController = require("./controllers/login-controller");
const authMiddleware = require("./middleware/auth");

const port = parseInt(process.env.PORT);

app.use(cors());
app.use(bodyparser.json());
app.use("/", loginController);
app.use(authMiddleware);

app.listen(port, async () => {
  await db.migrate(process.env.DB_NAME);
  await db.connect(process.env.DB_NAME);
  console.log("Running on port " + port);
});
