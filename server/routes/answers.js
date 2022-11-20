const express = require("express");
const { sql } = require("@databases/sqlite");

const answersRoutes = express.Router();

const { db } = require("../db/connect");

answersRoutes.route("/").get(function (req, res) {
  db.query(sql`SELECT * FROM answers;`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

answersRoutes.route("/question/:questionId").get(function (req, res) {
  let questionId = req.params.questionId;

  db.query(sql`SELECT * FROM answers WHERE question_id = ${questionId};`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

module.exports = answersRoutes;
