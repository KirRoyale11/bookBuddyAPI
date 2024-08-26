const express = require("express");
const booksRouter = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../db/books");

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

booksRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);
    console.log(result);
    res.send({ message: "Book deleted successfully", id: result });
  } catch (err) {
    res.send(err);
  }
});

booksRouter.patch("/:id", async (req, res) => {
  try {
    const result = await updateBook(req.params.id, req.body.available);
    res.send({ message: "Book info updated.", result });
  } catch (err) {
    res.send(err);
  }
});

module.exports = booksRouter;
