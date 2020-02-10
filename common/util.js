"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;

const validatePassword = (user, password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, user.password)
      .then(res => {
        if (!res) {
          return reject(new Error("Rossz felhasználónév, jelszó kombináció"));
        }
        return resolve(true);
      })
      .then(err => {
        return reject(err);
      });
  });
};

const hashPassword = plainPass => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(plainPass, SALT_ROUNDS)
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        return reject(new Error("Hiba jelszó hash készítés során"));
      });
  });
};

const generateToken = user => {
  const tokenProperties = {
    userId: user.id,
    name: user.name,
    username: user.username
  };

  const options = {
    algorithm: "HS512",
    expiresIn: TOKEN_LIFETIME
  };

  return new Promise((resolve, reject) => {
    jwt.sign(tokenProperties, JWT_SECRET_KEY, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

const validateToken = rawToken => {
  const token = rawToken.split(" ")[1];
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(new Error("A token nem megfelelő"));
      }
      return resolve(decoded);
    });
  });
};

module.exports = {
  validatePassword,
  generateToken,
  validateToken,
  hashPassword
};
