// Imports
const express = require("express");
const app = express();
const cors = require("cors");

// DB
const connect = require("@databases/sqlite");
const { sql } = require("@databases/sqlite");

export const db = connect();

// Config setup
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 25564;

// Enable cors and express
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
