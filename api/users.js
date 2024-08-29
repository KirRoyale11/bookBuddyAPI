const express = require("express");
const userRouter = express.Router();

const {
  createUser,
  getUsers,
  getUserByEmail,
  getUserById,
  getUser,
} = require("../db/users");

const jwt = require("jsonwebtoken");

// baseURL/users/me
userRouter.get("/me", (req, res) => {
  res.send("Your Account Info");
});

// userRouter.get("/", (req, res) => {
//   res.send("Users Home");
// });

// GET users
userRouter.get("/", async (req, res) => {
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
userRouter.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email) {
    res.send("Email not provided!");
    return;
    //do something here
  }
  if (!password) {
    res.send("Password not provided!");
    return;
    //do something here
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.send("User already registered with that email.");
      return;
    }
    const result = await createUser(req.body);
    if (result) {
      const token = jwt.sign({ id: result.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      console.log(token);
      res.send({
        message: "Registration Successful!",
        token,
        user: {
          id: result.id,
          firstname: result.firstname,
          lastname: result.lastname,
          email: result.email,
        },
      });
      return;
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
    console.log(result);
    res.send("User registered. Thanks!");
  } catch (err) {
    res.send(err);
  }
});

// modify login to add toekn if login successful
userRouter.post("/login", async (req, res, next) => {
  console.log(req.body.email);
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentailsError",
      message: "Please supply both an email and a password.",
    });
  }
  try {
    const result = await getUser(req.body);
    if (result) {
      //create token here and send with user id and email

      const token = jwt.sign({ id: result.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect!",
      });
    }

    // console.log(result);
    // res.send("Login successful!");
  } catch (err) {
    next(err);
  }
});

// userRouter.post("/")

module.exports = userRouter;
