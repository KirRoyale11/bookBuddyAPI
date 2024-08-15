const pg = require("pg");

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  //   password: process.env.DB_PASSWORD // to set default password if a password was enabled in setup
});

module.exports = client;
