const express = require("express");
const { sql } = require("@databases/sqlite");

const resultsRoutes = express.Router();

const { db } = require("../db/connect");

resultsRoutes.route("/").get(function (_req, res) {
  db.query(sql`SELECT * FROM results;`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

resultsRoutes.route("/:quizId").get(function (req, res) {
  let quizId = req.params.quizId;

  db.query(sql`SELECT * FROM results WHERE quiz_id = ${quizId};`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

resultsRoutes.route("/:quizId/add/:questionId").post(function (req, res) {
  const questionId = req.params.questionId;
  const value = req.body.value;
  const quizId = req.params.quizId;

  db.query(
    sql`REPLACE INTO results (quiz_id, question_id, value) 
      VALUES (${quizId}, ${questionId}, ${value})
    ;`
  ).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

module.exports = resultsRoutes;
