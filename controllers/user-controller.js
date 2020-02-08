const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.get("/user", async (req, res) => {
  try {
    const userName = req.query.userName;
    const user = await userService.getUserByUsername({ userName });
    res
      .json(user)
      .status(200)
      .end();
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});

module.exports = router;
