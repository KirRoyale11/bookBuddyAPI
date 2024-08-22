const express = require("express");
const booksRouter = express.Router();
const { getBooks, getBook, createBook } = require("../db/books");

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

booksRouter.post("/", async (req, res) => {
  try {
    const result = await createBook(req.body);
    console.log(result);
    res.send("Book created!");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = booksRouter;
