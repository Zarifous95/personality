const express = require("express");
const { sql } = require("@databases/sqlite");

const questionsRoutes = express.Router();

const { db } = require("../db/connect");

questionsRoutes.route("/").get(function (req, res) {
  db.query(sql`SELECT * FROM questions;`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

questionsRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;

  db.query(sql`SELECT * FROM questions WHERE id = ${id};`).then(
    (results) => res.json(results),
    (err) => console.error(err)
  );
});

module.exports = questionsRoutes;
