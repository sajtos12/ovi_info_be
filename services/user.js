const db = require("../db");

const login = async message => {
  const {
    data: { userName, password }
  } = message;

  const user = await getUserByUsername({ userName });
};

const getUserByUsername = async message => {
  const { userName } = message;

  const selectedUser = await db.query(
    'SELECT * FROM public."User" WHERE username = $1',
    [userName]
  );

  return selectedUser;
};

module.exports = { getUserByUsername };
