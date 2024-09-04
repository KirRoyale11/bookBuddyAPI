const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  const prefix = "Bearer ";
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    console.log(auth);
    const token = auth.slice(prefix.length);
    try {
      console.log("Checking...");
      const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
      const id = parsedToken && parsedToken.id;

      if (id) {
        req.user = await getUserById(id);
        console.log(req.user);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthHeaderError",
      message: "Auth Header must start with 'Bearer'",
    });
  }
});

// register routes for requests that have form baseURL/api/books
apiRouter.use("/books", require("./books"));

//register routes for requests of form baseURL/api/users
apiRouter.use("/users", require("./users"));
// baseURL/api
apiRouter.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = apiRouter;
