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

const createUser = async user => {
  const foundUser = await getUserByUsername({ userName: user.userName });
  if (foundUser[0] !== undefined) {
    throw new Error("Ez a felhasználónév már létezik!");
  }

  const password = await util.hashPassword(user.password);

  const inserted = await db.query(
    'INSERT INTO public."User"(username, password, name) VALUES($1, $2, $3) RETURNING *',
    [user.userName, password, user.name]
  );

  return inserted[0].id;
};

module.exports = { getUserByUsername, login, createUser };
