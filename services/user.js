"use strict";
const db = require("../db");
const util = require("../common/util");

const login = async message => {
  const { userName, password } = message;

  const user = await getUserByUsername({ userName });
  if (user[0] === undefined) {
    throw new Error("Nincs ilyen user");
  }

  const isValidPass = await util.validatePassword(user[0], password);
  if (isValidPass === false) {
    throw new Error("Rossz jelszó");
  }

  return util.generateToken(user[0]);
};

const getUserByUsername = async message => {
  const { userName } = message;

  const selectedUser = await db.query(
    'SELECT * FROM public."User" WHERE username = $1',
    [userName]
  );

  return selectedUser;
};

module.exports = { getUserByUsername, login };
