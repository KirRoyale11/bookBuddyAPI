const express = require("express");
const reservationsRouter = express.Router();

const { requireUser } = require("./utils");

const {
  getReservation,
  deleteReservation,
  updateBook,
  getBook,
} = require("../db");

reservationsRouter.get("/", (req, res) => {
  res.send("Hello from reservations!");
});

reservationsRouter.delete("/:id", async (req, res, next) => {
  try {
    // check if reservation with that id exists
    const reservation = await getReservation(req.params.id);
    console.log("RESERVATION", reservation);

    //if not, throw an error with message - res does not exist - STOP
    if (!reservation) {
      next({ name: "ResDoesNotExist", message: "Nothing to return" });
      return;
    } else if (req.user.id !== reservation.userid) {
      next({
        name: "Permission denied",
        message: "You do not have permission to return this book.",
      });
      return;
    } else {
      const deletedReservation = await deleteReservation(req.params.id);
      const book = await getBook(deletedReservation.bookId);
      if (deletedReservation) {
        updateBook(book.id, true);
        res.send({ deletedReservation });
      }
    }
    //If res is there, check the userid against the logged in user's id
    // -- if they dont match, throw error - not authorized to return this book
    // -- if they do match, delete the reservation (deleteReservation func)/confirm deletion AND update the book to be avail again
  } catch (error) {
    next(error);
  }
});

module.exports = reservationsRouter;
