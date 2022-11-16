const { sql } = require("@databases/sqlite");

export async function init_tables(db) {
  await db.query(sql`CREATE TABLE quiz (
    id VARCHAR NOT NULL PRIMARY KEY,
    value VARCHAR NOT NULL
  );`);

  await db.query(sql`CREATE TABLE questions (
    id VARCHAR NOT NULL PRIMARY KEY,
    text VARCHAR NOT NULL,
    value INT(10) NOT NULL
  );`);

  await db.query(sql`CREATE TABLE results (
    id VARCHAR NOT NULL PRIMARY KEY,
    value INT(10) NOT NULL
  );`);

  await db.query(sql`CREATE TABLE answers (
    id VARCHAR NOT NULL PRIMARY KEY,
    text VARCHAR NOT NULL,
    value INT(2) NOT NULL,
    question_id id VARCHAR NOT NULL
  );`);
}

export async function create(db) {
  db.query(sql`SELECT * FROM users;`).then(
    (results) => console.log(results),
    (err) => console.error(err)
  );
}

export async function read(db, id) {
  db.query(sql`SELECT * FROM users;`).then(
    (results) => console.log(results),
    (err) => console.error(err)
  );
}

export async function delete_entry(db, id) {
  db.query(sql`SELECT * FROM users;`).then(
    (results) => console.log(results),
    (err) => console.error(err)
  );
}

export async function update(db, id, updateParams) {
  db.query(sql`SELECT * FROM users;`).then(
    (results) => console.log(results),
    (err) => console.error(err)
  );
}
