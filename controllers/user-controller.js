const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const token = await userService.login({ userName, password });

    res
      .json({ token })
      .status(200)
      .end();
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});

module.exports = router;
