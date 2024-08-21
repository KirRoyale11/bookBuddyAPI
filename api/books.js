const express = require("express");
const { getBooks } = require("../db/books");

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "Something went wrong" });
  }
});

module.exports = booksRouter;
