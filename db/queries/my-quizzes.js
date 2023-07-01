const db = require('../connection'); //database connection

const getQuizzes = (userId) => {
  return db.query('SELECT quizzes.* FROM quizzes LEFT JOIN attempts ON quizzes.id = attempts.quiz_id WHERE visibility = true AND quizzes.user_id = $1 GROUP BY quizzes.id;',[userId])
    .then(data => {
      return data.rows;
    });
};

const getAverageScore = (id) => {
  return db.query('SELECT CAST(AVG(score) AS DECIMAL(10,2)) AS average_score FROM results WHERE quiz_id = $1;', [id])
  .then(data => {
    return data.rows[0].average_score;
  });
};

const getAttempts = (quizId) => {
  return db.query('SELECT COUNT(*) AS num_attempts FROM results WHERE quiz_id = $1;', [quizId])
  .then(data => {
    return data.rows[0].num_attempts;
  });
};




module.exports = { getQuizzes, getAverageScore, getAttempts};
