const client = require("./client");

const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    const SQL = `INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) ON CONFLICT(email) DO NOTHING RETURNING id, firstname, lastname, email`;
    const {
      rows: [user],
    } = await client.query(SQL, [firstname, lastname, email, password]);
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const getUserByEmail = async (email) => {
  try {
    const SQL = `SELECT * FROM users WHERE email=$1`;
    const {
      rows: [result],
    } = await client.query(SQL, [email]);
  } catch (err) {
    console.log(err);
  }
};

// getUsers
const getUsers = async () => {
  try {
    const SQL = `SELECT id, firstname,lastname,email FROM users`;
    const { rows } = await client.query(SQL);
    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

// getUserById
const getUserById = async (id) => {
  try {
    const SQL = `SELECT id, firstname, lastname, email FROM users WHERE id=$1`;
    const {
      rows: [user],
    } = await client.query(SQL, [id]);
    return user;
  } catch (err) {
    console.log({ err, message: "Error Detected" });
  }
};

module.exports = { createUser, getUserByEmail, getUsers, getUserById };
