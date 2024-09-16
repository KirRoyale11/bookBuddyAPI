const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

require("dotenv").config();
// console.log(process.env.TEST_VAR); SUCCESS

const client = require("./db/client");
client.connect();

server.use(cors());

app.use(express.json());

// console.log(process.env.JWT_SECRET); SUCCESS

// Registers the routes in /api/index.js, so we can send requests there
app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("Hi from our Server!");
});

app.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

app.use((error, req, res, next) => {
  console.log("ERROR", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    message: error.message,
    name: error.name,
  });
});

app.listen(PORT, () => {
  console.log(`This is Port ${PORT}, I'm listening.`);
});
