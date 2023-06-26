const db = require('../connection'); //databse connection

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes JOIN users ON users.id = quizzes.user_id WHERE users.id IN (SELECT id FROM users) ;')
    .then(data => {
      return data.rows;
    });
};

const getAverageScore = () => {
  return db.query('SELECT CAST(AVG(score) AS DECIMAL(10,2)) AS average_score FROM results JOIN users ON users.id = results.user_id WHERE user_id = 1;')
  .then(data => {
    return data.rows[0].average_score;
  });
};

const getAttempts = () => {
  return db.query('SELECT COUNT(*) AS num_attempts FROM attempts JOIN quizzes ON quizzes.id = attempts.quiz_id JOIN users ON users.id = attempts.user_id WHERE users.id = 1;')
  .then(data => {
    return data.rows[0].num_attempts;
  });
};




module.exports = { getQuizzes,getAverageScore, getAttempts };
