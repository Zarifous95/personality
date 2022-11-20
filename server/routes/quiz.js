const express = require("express");
const { sql } = require("@databases/sqlite");

const quizRoutes = express.Router();

const { db } = require("../db/connect");

quizRoutes.route("/").get(function (req, res) {
  db.query(sql`SELECT * FROM quiz;`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

quizRoutes.route("/:id").get(function (req, res) {
  const id = req.params.id;

  db.query(sql`SELECT * FROM quiz WHERE id = ${id};`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

quizRoutes.route("/add/:id").get(function (req, res) {
  const id = req.params.id;
  const value = "test" + id;

  db.query(
    sql`INSERT INTO quiz (id, value) 
    VALUES (${id}, ${value})
  ;`
  ).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

module.exports = quizRoutes;
