const client = require("./client");

//1)  Create a function createBook({
// title,
// author,
// description,
// coverImange,
// available })
// to insert into the 'books' table in the db - JUST LIKE createUser func

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
    console.log(book);
    return book;
  } catch (err) {
    console.log(err);
  }
};

// 2) Export function from this file X

module.exports = { createBook };
