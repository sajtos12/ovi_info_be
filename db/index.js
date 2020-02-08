const { Client } = require("pg");
const Postgrator = require("postgrator");

let db;

const connect = async databasename => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    port: "5432",
    database: databasename
  });

  db = databasename;

  client
    .connect()
    .then(() => {
      console.log("Connected to database " + databasename);
    })
    .catch(err => {
      console.log(err.message);
    });
};

const query = async (query, params) => {
  //let result;
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    port: "5432",
    database: db
  });
  client.connect();

  const result = await client.query(query, params);
  /* .then(res => {
      result = res.rows;
      console.log(res);
    })
    .catch(err => {
      console.log(err.message);
    }); */
  return result.rows;
};

const migrate = async databasename => {
  const postgrator = new Postgrator({
    migrationDirectory: __dirname + "/migrations",
    driver: "pg",
    host: "localhost",
    port: 5432,
    database: databasename,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    schemaTable: "schemaversion"
  });

  await postgrator
    .migrate()
    .then(appliedMigrations => {
      if (appliedMigrations[0] === undefined) {
        console.log("Already up to date");
      } else {
        for (const migration in appliedMigrations) {
          console.log(
            "Applied migration: " + appliedMigrations[migration].filename
          );
        }
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};

module.exports = {
  connect,
  migrate,
  query
};
