const express = require("express");
const booksRouter = express.Router();

booksRouter.get("/", (req, res) => {
  res.send("List of Books");
});

module.exports = booksRouter;
