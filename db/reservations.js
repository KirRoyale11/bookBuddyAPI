const client = require("./client");

const createReservation = async ({ userId, booksId }) => {
  try {
    const SQL = `INSERT INTO reservations(userId, booksId)
    VALUES($1,$2)
    RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [userId, booksId]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getReservation = async (id) => {
  try {
    const SQL = `SELECT * FROM reservations WHERE id=$1`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteReservation = async (id) => {
  try {
    const SQL = `DELETE FROM reservations WHERE id=$1`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteBook = async (id) => {
  try {
    const SQL = `DELETE FROM books WHERE id=$1`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createReservation, getReservation, deleteReservation };
