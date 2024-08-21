const express = require("express");
const booksRouter = express.Router();
const { getBooks, getBook } = require("../db/books");

booksRouter.get("/", async (req, res) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "Something went wrong" });
  }
});

booksRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getBook(id);
    res.send(result);
  } catch (err) {
    console.log({ err, message: "Something went wrong" });
  }
});

module.exports = booksRouter;
