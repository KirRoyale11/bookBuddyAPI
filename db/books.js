const client = require("./client");

const getBooks = async () => {
  try {
    const SQL = `SELECT * FROM books`;
    const { rows } = await client.query(SQL);
    // console.log(rows);
    return rows;
  } catch (err) {
    res.send(err);
  }
};

const getBook = async (id) => {
  try {
    const SQL = `SELECT * FROM books WHERE id=$1`;
    const {
      rows: [book],
    } = await client.query(SQL, [id]);
    return book;
  } catch (err) {
    console.log(err);
  }
};

const createBook = async ({
  title,
  author,
  description,
  coverimage,
  available,
}) => {
  try {
    const SQL = `INSERT INTO books(title, author, description, coverimage, available) 
       VALUES($1,$2,$3,$4,$5) 
       RETURNING id, title, author, description, coverimage, available`;
    const {
      rows: [book],
    } = await client.query(SQL, [
      title,
      author,
      description,
      coverimage,
      available,
    ]);
    // console.log(book);
    return book;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createBook, getBooks, getBook };
