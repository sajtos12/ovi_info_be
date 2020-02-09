"use strict";

const util = require("../common/util");

const authMiddleware = async (req, res, next) => {
  try {
    const rawToken = req.header("Authorization") || null;
    const tokenDetails = await util.validateToken(rawToken);
    req.tokenDetails = tokenDetails;
    next();
  } catch (error) {
    res
      .status(500)
      .json(error.message)
      .end();
  }
};

module.exports = authMiddleware;
