const client = require("./client");

const createReservation = async ({ booksId, userId }) => {
  try {
    const SQL = `INSERT INTO reservations(booksid, userId)
    VALUES($1,$2)
    RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [booksId, userId]);
    return result;
  } catch (err) {
    throw err;
  }
};
// await createReservation({ userId: req.user.id, booksId: updated.id });

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

const getUsersReservations = async (userId) => {
  console.log(userId);
  try {
    const SQL = `SELECT reservations.id, books.id, books.title, books.description, books.coverimage, books.author FROM 
    reservations JOIN books ON reservations.booksid = books.id AND userid=$1`;

    const { rows } = await client.query(SQL, [userId]);
    if (!rows) return;
    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteReservation = async (id) => {
  try {
    const SQL = `DELETE FROM reservations WHERE id=$1 RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createReservation,
  getReservation,
  getUsersReservations,
  deleteReservation,
};
