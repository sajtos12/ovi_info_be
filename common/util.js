const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = process.env.SALT_ROUNDS;
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
