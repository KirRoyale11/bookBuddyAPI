const express = require("express");
const booksRouter = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../db");
const { createReservation } = require("../db/reservations");
const { requireUser } = require("./utils");

booksRouter.get("/", async (req, res, next) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

booksRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // console.log(id); SUCCESS
    if (isNaN(id) || req.params.id === " ") {
      next({
        name: "Invalid ID Format",
        message: "The provided request parameter is not a valid book ID.",
      });
      return;
    }
    const result = await getBook(id);
    if (!result) {
      next({ name: "NotFound", message: "No matching book found." });
      return;
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

booksRouter.post("/", requireUser, async (req, res) => {
  try {
    const result = await createBook(req.body);
    console.log(result);
    res.send("Book created!");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

booksRouter.delete("/:id", requireUser, async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);
    console.log(result);
    res.send({ message: "Book deleted successfully", id: result });
  } catch (err) {
    res.send(err);
  }
});

booksRouter.patch("/:id", requireUser, async (req, res, next) => {
  console.log("USER", req.user);
  try {
    const id = Number(req.params.id);
    console.log(id);
    if (isNaN(id) || req.params.id === " ") {
      next({
        name: "InvalidIDFormat2",
        message: "The provided request is not a valid book ID.",
      });
      return;
    }

    const result = await getBook(id);
    if (!result) {
      next({ name: "NotFound2", message: "No matching book found." });
      return;
    } else {
      const updated = await updateBook(req.params.id, req.body.available);
      if (updated) {
        await createReservation({ userId: req.user.id, booksId: updated.id });
        res.send({
          message: "Updated successfully.",
          updated,
        });
      } else {
        next({
          name: "UpdateError",
          message: "Error updating book.",
        });
        return;
      }
    }
    // res.send({ message: "Book info updated.", result });
  } catch (err) {
    next(err);
  }
});

module.exports = booksRouter;
