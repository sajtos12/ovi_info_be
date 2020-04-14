"use strict";
const db = require("../db");

const getOneById = async (kindergartenId) => {
  const selectedKindergarten = await db.query(
    'SELECT * FROM public."Kindergarden" WHERE id = $1',
    [kindergartenId]
  );

  return selectedKindergarten;
};

module.exports = { getOneById };
