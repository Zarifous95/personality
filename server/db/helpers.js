const { sql } = require("@databases/sqlite");
const { db } = require("./connect");

async function init_tables() {
  await db.query(sql`CREATE TABLE quiz (
    id VARCHAR NOT NULL PRIMARY KEY
  );`);

  await db.query(sql`CREATE TABLE results (
    quiz_id VARCHAR NOT NULL,
    question_id VARCHAR NOT NULL,
    value INT(10) NOT NULL,
    PRIMARY KEY (quiz_id, question_id)
  );`);
}

async function drop_tables() {
  await db.query(sql`DROP TABLE quiz;`);

  await db.query(sql`DROP TABLE questions;`);

  await db.query(sql`DROP TABLE results;`);

  await db.query(sql`DROP TABLE answers;`);
}

async function init_questions() {
  await db.query(sql`CREATE TABLE questions (
    id VARCHAR NOT NULL PRIMARY KEY,
    text VARCHAR NOT NULL
  );`);

  await db.query(sql`INSERT INTO questions (id, text)
  VALUES 
  (1, "You’re really busy at work and a colleague is telling you their life story and personal woes. You:"), 
  (2, "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:"), 
  (3, "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:"), 
  (4, "You are taking part in a guided tour of a museum. You:"), 
  (5, "During dinner parties at your home, you have a hard time with people who:")
  ;`);
}
async function init_answers() {
  await db.query(sql`CREATE TABLE answers (
    id VARCHAR NOT NULL PRIMARY KEY,
    text VARCHAR NOT NULL,
    value INT(2) NOT NULL,
    question_id VARCHAR NOT NULL
  );`);

  await db.query(sql`INSERT INTO answers (id, text, value, question_id)
  VALUES 
  (1, "Don't dare to interrupt them", 2, 1), 
  (2, "Think it's more important to give them some of your time; work can wait", 4, 1), 
  (3, "Listen, but with only half an ear", 3, 1), 
  (4, "Interrupt and explain that you are really busy at the moment", 1, 1), 

  (5, "Look at your watch every two minutes", 3, 2), 
  (6, "Bubble with inner anger, but keep quiet", 2, 2), 
  (7, "Explain to other equally impatient people in the room that the doctor is always running late", 4, 2), 
  (8, "Complain in a loud void, while tapping you foor impatienlty", 1, 2), 

  (9, "Don't dare contradict them", 2, 3), 
  (10, "Think that they are obviously right", 1, 3), 
  (11, "Defend your own point of view, tooth and nail", 4, 3), 
  (12, "Continuously interrupt your colleague", 3, 3), 

  (13, "Are bit too far towards the back so don't really hear what they guide is saying", 1, 4), 
  (14, "Follow the group without question", 2, 4), 
  (15, "Make sure that everyone is able to hear properly", 3, 4), 
  (16, "Are right up the front, adding your own comments in a loud voice", 4, 4), 

  (17, "Ask you to tell a story in front of everyone else", 2, 5), 
  (18, "Talk privately between themselves", 4, 5), 
  (19, "Hang around you all evening", 1, 5), 
  (20, "Always drag the conversation back to themselves", 3, 5);`);
}
module.exports = {
  init_answers,
  init_tables,
  init_questions,
};
