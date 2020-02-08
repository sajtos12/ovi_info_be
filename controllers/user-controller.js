const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.get("/user", async (req, res) => {
  try {
    const { userName, password } = req.query;
    console.log(userName, password);
    const user = await userService.getUserByUsername({ userName });
    const token = await userService.login({ userName, password });
    console.log(user);
    console.log(token);
    res
      .json(user[0])
      .status(200)
      .end();
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});

module.exports = router;
