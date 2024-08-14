const express = require("express");
const userRouter = express.Router();

// baseURL/users/me
userRouter.get("/me", (req, res) => {
  res.send("Your Account Info");
});

userRouter.get("/", (req, res) => {
  res.send("Users Home");
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
