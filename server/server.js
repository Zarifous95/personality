// Imports
const express = require("express");
const app = express();
const cors = require("cors");

const { init_tables, init_questions, init_answers } = require("./db/helpers");

// Route imports
const questions = require("./routes/questions");
const answers = require("./routes/answers");
const quiz = require("./routes/quiz");
const results = require("./routes/results");

// Config setup
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// Enable cors and express
app.use(cors());
app.use(express.json());

// Routes
app.use("/questions", questions);
app.use("/answers", answers);
app.use("/quiz", quiz);
app.use("/results", results);

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);

  init_tables();
  init_questions();
  init_answers();
});
