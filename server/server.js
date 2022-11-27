// Imports
const express = require("express");
const app = express();
const path = require("path");
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

// Production assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);

  init_tables();
  init_questions();
  init_answers();
});
