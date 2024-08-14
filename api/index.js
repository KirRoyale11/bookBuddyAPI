const express = require("express");

const apiRouter = express.Router();
// register routes for requesta that have form baseURL/api/books
apiRouter.use("/books", require("./books"));

//register routes for requests of form baseURL/api/users
apiRouter.use("/users", require("./users"));
// baseURL/api
apiRouter.get("/", (req, res) => {
  res.send("Hello from /api");
});

module.exports = apiRouter;
