const express = require("express");
const userRouter = express.Router();

const {
  createUser,
  getUsers,
  getUserByEmail,
  getUserById,
  getUser,
  getUsersReservations,
} = require("../db");

const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");

// userRouter.get("/", async (req, res) => {
//   try {
//     const results = await getUsers();
//     res.send(results);
//   } catch (err) {
//     res.send({ err, message: "Oh no! Something went wrong." });
//   }
// });

// baseURL/users/me
userRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    if (req.user) {
      const userReservations = await getUsersReservations(req.user.id);
      console.log(userReservations);
      req.user.books = userReservations;
      res.send(req.user);
    } else {
      res.send("Error, please log in correctly.");
    }
  } catch (error) {}
});

// userRouter.get("/", (req, res) => {
//   res.send("Users Home");
// });

// GET userById
// userRouter.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await getUserById(id);
//     res.send(user);
//   } catch (err) {
//     res.send({ err, message: "Oh no! Something went wrong." });
//   }
// });

//POST request to baseURL/api/users/register
userRouter.post("/register", async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email) {
    next({ name: "EmailRequiredError", message: "Email not provided." });
    return;
    //do something here
  }
  if (!password) {
    next({ name: "PasswordRequiredError", message: "Password not provided" });
    return;
    //do something here
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      next({
        name: "ExistingUserError",
        message: "User already registered with that email.",
      });
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
        name: "RegistrationError",
        message: "Error registering, please try again.",
      });
      return;
    }
  } catch (err) {
    next(err);
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
