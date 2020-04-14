"use strict";
const express = require("express");
const router = express.Router();
const userService = require("../services/user");
const util = require("../common/util");

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const token = await userService.login({ userName, password });

    res.json(token).status(200).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).end();
  }
});

router.post("/token", async (req, res) => {
  try {
    const decoded = await util.validateToken(req.body.token);
    res.json(decoded).status(200).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message).end();
  }
});

router.post("/user", async (req, res) => {
  try {
    const inserted = await userService.createUser(req.body);
    res.status(200).json(inserted).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message).end();
  }
});

module.exports = router;
