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

resultsRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;

  db.query(sql`SELECT * FROM results WHERE id = ${id};`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

resultsRoutes.route("/quiz/:quizId").get(function (req, res) {
  let quizId = req.params.quizId;

  db.query(sql`SELECT * FROM results WHERE quiz_id = ${quizId};`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

resultsRoutes.route("/quiz/:quizId/add/:id").post(function (req, res) {
  const id = req.params.id;
  const value = req.body.value;
  const quizId = req.body.quizId;

  db.query(
    sql`REPLACE INTO results (id, value, quiz_id) 
      VALUES (${id}, ${value}, ${quizId})
    ;`
  ).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

module.exports = recordRoutes;
