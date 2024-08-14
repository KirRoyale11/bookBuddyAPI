const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

// Registers the routes in /api/index.js, so we can send requests there
app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("Hi from our Server!");
});

app.listen(PORT, () => {
  console.log("Hello, world, I'm listening.");
});
