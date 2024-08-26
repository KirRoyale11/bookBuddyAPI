const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const SQL = `INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) ON CONFLICT(email) DO NOTHING RETURNING id, firstname, lastname, email`;
    const {
      rows: [user],
    } = await client.query(SQL, [
      firstname || "First Name",
      lastname || "Last Name",
      email,
      hashedPassword,
    ]);
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
    return result;
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

const getUser = async ({ email, password }) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return;
    const hashedPassword = existingUser.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete existingUser.password;
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

module.exports = { createUser, getUserByEmail, getUsers, getUser, getUserById };
