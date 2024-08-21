const express = require("express");
const userRouter = express.Router();

const { getUsers, getUserById } = require("../db/users");

// baseURL/users/me
userRouter.get("/me", (req, res) => {
  res.send("Your Account Info");
});

userRouter.get("/", (req, res) => {
  res.send("Users Home");
});

// GET users
userRouter.get("/users", async (req, res) => {
  try {
    const results = await getUsers();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "Oh no! Something went wrong." });
  }
});

// GET userById
userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    res.send({ err, message: "Oh no! Something went wrong." });
  }
});

//POST request to baseURL/api/users/register
userRouter.post("/register", (req, res) => {
  console.log("Request Body", req.body);
  res.send("User registered. Thanks!");
});

userRouter.post("/login", (req, res) => {
  console.log("REQUEST BODY", req.body);
  res.send("Login successful!");
});

module.exports = userRouter;
