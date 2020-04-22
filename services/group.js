"use strict";
const db = require("../db");

const getAllGroupByKindergarten = async (kindergartenId) => {
  const groups = await db.query(
    'SELECT *, (SELECT Count(id) FROM public."Child" as C where C.group_id = G.id ) as Letszam FROM public."Group" as G WHERE kindergarden_id = $1',
    [kindergartenId]
  );
  return groups;
};

module.exports = { getAllGroupByKindergarten };
