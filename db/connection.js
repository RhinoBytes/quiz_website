// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();
// async functions for create_quiz
async function insertUser(username) {
  const userQuery = 'INSERT INTO users (username) VALUES ($1) RETURNING id';
  const userResult = await db.query(userQuery, [username]);
  return userResult.rows[0].id;
}

async function insertQuiz(title, description, visibility, userId, createdAt) {
  const quizQuery =
    'INSERT INTO quizzes (title, description, visibility, user_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id';
  const quizResult = await db.query(quizQuery, [
    title,
    description,
    visibility,
    userId,
    createdAt,
  ]);
  return quizResult.rows[0].id;
}

async function insertQuestion(question, quizId) {
  const questionQuery = 'INSERT INTO questions (text, quiz_id) VALUES ($1, $2)';
  await db.query(questionQuery, [question, quizId]);
}



module.exports = {
  db,
  insertUser,
  insertQuiz,
  insertQuestion,
};
