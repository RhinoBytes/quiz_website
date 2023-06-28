const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


// async functions for create_quiz
async function insertUser(username) {
  const existingUserQuery = 'SELECT id FROM users WHERE username = $1';
  const existingUserResult = await db.query(existingUserQuery, [username]);

  if (existingUserResult.rows.length > 0) {
    // User already exists, return the existing user's ID
    return existingUserResult.rows[0].id;
  } else {
    // User does not exist, create new user
    const newUserQuery = 'INSERT INTO users (username) VALUES ($1) RETURNING id';
    const newUserResult = await db.query(newUserQuery, [username]);
    return newUserResult.rows[0].id;
  }
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
  const questionQuery = 'INSERT INTO questions (text, quiz_id) VALUES ($1, $2) RETURNING id';
  const questionResult = await db.query(questionQuery, [question, quizId]);
  return questionResult.rows[0].id;
}

async function insertChoice(answer, is_correct_answer, questionId) {
  const choiceQuery = 'INSERT INTO choices (answer, is_correct_answer, question_id) VALUES ($1, $2, $3)';
  await db.query(choiceQuery, [answer, is_correct_answer, questionId]);
}



module.exports = {
  getUsers,
  insertUser,
  insertQuiz,
  insertQuestion,
  insertChoice,
};
