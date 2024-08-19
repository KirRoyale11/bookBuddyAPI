require("dotenv").config();

const client = require("./client");
const { createUser, getUserByEmail } = require("./users");

const users = [
  {
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice@example.com",
    password: "alice123",
  },
  {
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@example.com",
    password: "bob456",
  },
  {
    firstname: "Charlie",
    lastname: "Brown",
    email: "charlie@example.com",
    password: "charlie789",
  },
];

const dropTables = async () => {
  try {
    await client.query(`DROP TABLE IF EXISTS users`);
    await client.query(`DROP TABLE IF EXISTS books`);
  } catch (err) {
    console.log(err);
  }
};

const createTables = async () => {
  try {
    await client.query(`CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(64),
            lastname VARCHAR(64),
            email VARCHAR(64) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            )`);

    await client.query(`CREATE TABLE books(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(128) NOT NULL,
        description VARCHAR(1024),
        coverimage VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg',
        available BOOLEAN DEFAULT TRUE
        )`);
  } catch (err) {
    console.log(err);
  }
};

//write another createTable here for

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
  } catch (err) {
    console.log(err);
  }
};

//create function insertBooks

const seedDatabase = async () => {
  try {
    client.connect();
    console.log("Dropping Tables...");
    await dropTables();
    console.log("Tables dropped!");
    console.log("Creating Tables...");
    await createTables();
    console.log("Tables successfully created!");
    // await createUser(users[0]);
    console.log("Inserting users...");
    await insertUsers();
    console.log("Users added!");
    await getUserByEmail("alice@example.com");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
};

seedDatabase();
